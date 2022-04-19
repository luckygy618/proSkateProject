const debug = require('debug')('api:controllers:product');
const Joi = require('joi');
const pool = require('../database/pool');

const productSchema = Joi.object({
  product_id: Joi.string().required(),
  product_name: Joi.string().required(),
  image: Joi.string().required(),
  price: Joi.number().precision(2).required(),
  stock_amount: Joi.number().required(),
  sku: Joi.string().allow('', null),
  brand: Joi.string().allow('', null),
  intro: Joi.string().allow('', null),
  description: Joi.string().allow('', null),
  stock_status: Joi.string().allow('', null),
  rating: Joi.number().required(),
});

module.exports.validateProduct = function (product) {
  return new Promise((resolve, reject) => {
    try {
      result = Joi.attempt(product, productSchema);
      resolve(result);
    } catch (err) {
      debug(err);
      reject(err);
    }
  });
};

module.exports.getAllProducts = function () {
  return new Promise(async (resolve, reject) => {
    var db;
    try {
      db = await pool.connect();
      let products = await db.query('SELECT * FROM products');
      resolve(products.rows);
    } catch (err) {
      debug(err);
      reject(err);
    } finally {
      db.release(true);
    }
  });
};

module.exports.getProduct = function (productId) {
  return new Promise(async (resolve, reject) => {
    var db;
    try {
      db = await pool.connect();
      let products = await db.query(`SELECT * FROM products where product_id = '${productId}';`);

      if (products.rowCount == 0) {
        throw new Error(`Product not found for id ${productId}`);
      }
      if (products.rowCount > 1) {
        throw new Error(`Multiple products found for id ${productId}`);
      }

      resolve(products.rows[0]);
    } catch (err) {
      debug(err);
      reject(err);
    } finally {
      db.release(true);
    }
  });
};

module.exports.addProduct = function (item) {
  return new Promise(async (resolve, reject) => {
    var db;
    try {
      db = await pool.connect();
      var sql = `INSERT INTO products 
      (product_id, product_name, image, price, 
      stock_amount, sku, brand, intro, description, 
      stock_status, rating) VALUES 
      ('${item.product_id}', '${item.product_name}', '${item.image}', 
      ${item.price}, ${item.stock_amount}, '${item.sku}', 
      '${item.brand}', '${item.intro}', '${item.description}', 
      '${item.stock_status}', ${item.rating}) RETURNING product_id;`;

      let result = await db.query(sql);
      resolve(result);
    } catch (err) {
      debug(err);
      reject(err);
    } finally {
      db.release(true);
    }
  });
};

module.exports.updateProduct = function (productId, item) {
  return new Promise(async (resolve, reject) => {
    var db;
    try {
      db = await pool.connect();
      if (productId != item.product_id) {
        throw new Error(`product ids ${productId} and ${item.product_id} do not match`);
      }

      var sql = `UPDATE products SET 
      product_name = '${item.product_name}', 
      image = '${item.image}', 
      price = ${item.price}, 
      stock_amount =  ${item.stock_amount}, 
      sku='${item.sku}', 
      brand = '${item.brand}', 
      intro = '${item.intro}', 
      description = '${item.description}', 
      stock_status = '${item.stock_status}', 
      rating = ${item.rating} 
      WHERE product_id = '${item.product_id}';`;

      let result = await db.query(sql);
      if (result.rowCount == 1) {
        resolve(result);
      } else {
        throw new Error(`product with id ${item.product_id} does not exist`);
      }
    } catch (err) {
      debug(err);
      reject(err);
    } finally {
      db.release(true);
    }
  });
};

module.exports.deleteProduct = function (productId) {
  return new Promise(async (resolve, reject) => {
    var db;
    try {
      db = await pool.connect();
      let result = await db.query(`delete from products where product_id = '${productId}';`);
      resolve(result);
    } catch (err) {
      debug(err);
      reject(err);
    } finally {
      db.release(true);
    }
  });
};
