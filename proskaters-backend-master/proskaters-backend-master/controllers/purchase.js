const debug = require('debug')('api:controllers:purchase');
const Joi = require('joi');
const pool = require('../database/pool');
const arrayUtils = require('../utils/array');
const orderStatus = require('./order-status');

const lineItemSchema = Joi.object({
  product_id: Joi.string().required(),
  quantity: Joi.number().required(),
  lineTotal: Joi.number().precision(2).required(),
});

const purchaseSchema = Joi.object({
  items: Joi.array().items(lineItemSchema).required(),
  totalQuantity: Joi.number().required(),
  subtotal: Joi.number().precision(2).required(),
});

module.exports.validatePurchase = function (purchase) {
  return new Promise((resolve, reject) => {
    try {
      result = Joi.attempt(purchase, purchaseSchema);
      resolve(result);
    } catch (err) {
      debug(err);
      reject(err);
    }
  });
};

module.exports.validateStock = function (purchase) {
  return new Promise(async (resolve, reject) => {
    var items = purchase.items;
    var db;

    try {
      db = await pool.connect();

      productIds = [];
      for (var i = 0; i < items.length; i++) {
        productIds.push(`'${items[i].product_id}'`);
      }
      var productIdStr = productIds.toString();
      debug(`productIdStr = ${productIdStr}`);

      var sql = `SELECT product_id, stock_amount FROM products WHERE product_id IN ( ${productIdStr} );`;
      var result = await db.query(sql);
      result = result.rows;

      if (result.length != items.length) {
        throw new Error('One or more product_id from purchase is not found in database');
      }

      var currentStock = arrayUtils.mapArrayToDict(result, 'product_id', 'stock_amount');
      debug(`${currentStock}`);

      for (var i = 0; i < items.length; i++) {
        var productId = items[i].product_id;
        var purchaseAmount = items[i].quantity;
        var currentAmount = currentStock[productId];
        debug(
          `purchaseAmount = ${purchaseAmount}, currentAmount = ${currentAmount}, product_id = ${productId}`
        );

        if (currentAmount >= purchaseAmount) {
          continue;
        }

        throw new Error(
          `Product ${productId} only has ${currentAmount} left, trying to purchase ${purchaseAmount}`
        );
      }

      resolve(currentStock);
    } catch (err) {
      debug(err);
      reject(err);
    } finally {
      db.release(true);
    }
  });
};

module.exports.updateStockAndCreateOrder = function (
  email,
  paymentIntentId,
  purchase,
  currentStock
) {
  return new Promise(async (resolve, reject) => {
    var items = purchase.items;
    var db;
    var sql;

    try {
      db = await pool.connect();

      // begin transaction
      await db.query('BEGIN');

      // create a new order in the orders table
      sql = `INSERT INTO orders 
        (email, transaction_token, total_quantity, subtotal, status, creation_time, last_modified_time) 
        VALUES 
        ('${email}', '${paymentIntentId}', '${purchase.totalQuantity}', 
        '${purchase.subtotal}', '${orderStatus.STATUS_ORDERED}', current_timestamp, current_timestamp) 
        RETURNING id;`;

      var order_id;
      var result = await db.query(sql);
      if (result.rowCount == 1) {
        order_id = result.rows[0]['id'];
      } else {
        throw new Error(`Failed to insert order made by account ${email} into database 
          with total quantity ${purchase.totalQuantity} and subtotal ${purchase.subtotal}.`);
      }

      // for every line item
      for (var i = 0; i < items.length; i++) {
        var product_id = items[i].product_id;
        var lineTotal = items[i].lineTotal;
        var purchaseAmount = items[i].quantity;
        var currentAmount = currentStock[product_id];
        var newAmount = currentAmount - purchaseAmount;

        // update the stock
        sql = `UPDATE products SET stock_amount = ${newAmount} WHERE product_id = '${product_id}';`;
        await db.query(sql);

        // create a row for every line item in lineitems table
        sql = `INSERT INTO lineitems 
        (order_id, product_id, quantity, linetotal) 
        VALUES 
         ('${order_id}', '${product_id}', '${purchaseAmount}', '${lineTotal}') 
        RETURNING id`;
        await db.query(sql);

        items[i].lineTotal;
      }

      // record the activity in orderlogs
      sql = `INSERT INTO orderlogs 
        (order_id, status, modified_time) 
        VALUES 
        ('${order_id}', '${orderStatus.STATUS_ORDERED}', current_timestamp) RETURNING id;`;

      await db.query(sql);

      await db.query('COMMIT');
      resolve();
    } catch (err) {
      debug(err);
      await db.query('ROLLBACK');
      reject(err);
    } finally {
      db.release(true);
    }
  });
};
