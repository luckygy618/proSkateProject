const debug = require('debug')('api:controllers:order');
const pool = require('../database/pool');

module.exports.getOrderById = function (id) {
  return new Promise(async (resolve, reject) => {
    var db;

    try {
      db = await pool.connect();

      var sql = `SELECT * FROM orders WHERE orders.id = '${id}'`;
      var result = await db.query(sql);
      if (result.rowCount > 1) {
        throw new Error(`More than one orders found for id ${id}.`);
      }

      if (result.rowCount < 1) {
        throw new Error(`No orders found for id ${id}.`);
      }

      var data = result.rows[0];
      sql = `SELECT product_id, quantity, linetotal FROM lineitems WHERE lineitems.order_id = '${id}'`;
      result = await db.query(sql);
      if (result.rowCount <= 0) {
        throw new Error(`No line items found for order with id ${id}.`);
      }

      data.items = result.rows;
      resolve(data);
    } catch (err) {
      debug(err);
      reject(err);
    } finally {
      db.release(true);
    }
  });
};

module.exports.getOrdersByEmail = function (email) {
  return new Promise(async (resolve, reject) => {
    var db;

    try {
      db = await pool.connect();
      var sql = `SELECT * FROM orders WHERE email = '${email}'`;
      var result = await db.query(sql);
      var orders = result.rows;

      // TODO:
      // need to optimize. too many calls into the database if the user has a large purchase history
      for (var i = 0; i < orders.length; i++) {
        var order = orders[i];
        sql = `SELECT product_id, quantity, linetotal FROM lineitems WHERE lineitems.order_id = '${order.id}'`;
        result = await db.query(sql);
        if (result.rowCount <= 0) {
          throw new Error(`No line items found for order with id ${order.id}.`);
        }
        order.items = result.rows;
      }
      resolve(orders);
    } catch (err) {
      debug(err);
      reject(err);
    } finally {
      db.release(true);
    }
  });
};

module.exports.updateOrderStatus = function (id, status) {
  return new Promise(async (resolve, reject) => {
    var db;

    try {
      db = await pool.connect();

      // begin transaction
      await db.query('BEGIN');

      // update orders table
      var sql = `UPDATE orders SET 
      status = '${status}', 
      last_modified_time = current_timestamp 
      WHERE id = '${id}';`;
      await db.query(sql);

      // record the activity in orderlogs
      sql = `INSERT INTO orderlogs 
        (order_id, status, modified_time) 
        VALUES 
        ('${id}', '${status}', current_timestamp) RETURNING id;`;
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
