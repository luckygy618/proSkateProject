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

module.exports.getAllProducts = function () {
  return new Promise(async (resolve, reject) => {
    try {
      const db = await pool.connect();
      let products = await db.query('SELECT * FROM products');
      if (products.rowCount < 1) {
        let msg = 'No data in database.';
        reject({
          error: msg,
        });
      } else {
        resolve(products.rows);
      }
    } catch (err) {
      debug(err);
      var msg = '';
      if (err.routine == 'auth_failed') {
        msg = 'Failed to connect to database';
      } else {
        msg = err.routine;
      }

      reject({
        error: msg,
      });
    }
  });
};

module.exports.validateProduct = function (product) {
  return new Promise((resolve, reject) => {
    try {
      result = Joi.attempt(product, productSchema);
      resolve(result);
    } catch (err) {
      debug(err);
      console.log(err);
      reject({
        error: err.details[0].message,
      });
    }
  });
};

module.exports.addProduct = function (item) {
  return new Promise(async (resolve, reject) => {
    try {
      const db = await pool.connect();
      var sql_insert = `INSERT INTO products(product_id, product_name, image, price, stock_amount, sku, brand, intro,description,stock_status,rating) VALUES ('${item.product_id}','${item.product_name}','${item.image}',${item.price},${item.stock_amount},'${item.sku}','${item.brand}','${item.intro}','${item.description}','${item.stock_status}',${item.rating});`;
      let result = await db.query(sql_insert);
      if (result.rowCount == 1) {
        let msg = 'product added to database.';
        resolve({
          message: msg,
        });
      } else {
        let msg = 'Failed to insert product to database.';
        reject({
          error: msg,
        });
      }
    } catch (err) {
      debug(err);
      var msg = '';
      if (err.routine == 'auth_failed') {
        msg = 'Failed to connect to database';
      } else if (err.detail) {
        msg = err.detail;
      } else {
        msg = err.routine;
      }

      reject({
        error: msg,
      });
    }
  });
};

module.exports.updateProduct = function (productId, item) {
  return new Promise(async (resolve, reject) => {
    try {
      const db = await pool.connect();
      if (productId != item.product_id) {
        let err = 'product id does not match';
        reject({
          error: err,
        });
      }
      var sql_update = `UPDATE products SET product_name = '${item.product_name}', image = '${item.image}',  price= ${item.price}, stock_amount =  ${item.stock_amount}, sku='${item.sku}',brand = '${item.brand}',intro='${item.intro}',description='${item.description}',stock_status='${item.stock_status}',rating=${item.rating} where product_id = '${item.product_id}';`;
      let result = await db.query(sql_update);
      if (result.rowCount == 1) {
        let msg = 'product updated.';
        resolve({
          message: msg,
        });
      } else {
        let msg = 'product id does not exist.';
        reject({
          error: msg,
        });
      }
    } catch (err) {
      debug(err);
      var msg = '';
      if (err.routine == 'auth_failed') {
        msg = 'Failed to connect to database';
      } else if (err.detail) {
        msg = err.detail;
      } else {
        msg = err.routine;
      }

      reject({
        error: msg,
      });
    }
  });
};

module.exports.deleteProduct = function (productId) {
  return new Promise(async (resolve, reject) => {
    try {
      const db = await pool.connect();
      var sql_delete = `delete from products where product_id = '${productId}';`;
      let result = await db.query(sql_delete);

      if (result.rowCount == 1) {
        let msg = 'product deleted.';
        resolve({
          message: msg,
        });
      } else {
        let msg = 'product id does not exist.';
        reject({
          error: msg,
        });
      }
    } catch (err) {
      debug(err);
      var msg = '';
      if (err.routine == 'auth_failed') {
        msg = 'Failed to connect to database';
      } else if (err.detail) {
        msg = err.detail;
      } else {
        msg = err.routine;
      }

      reject({
        error: msg,
      });
    }
  });
};

module.exports.getProduct = function (productId) {
  return new Promise(async (resolve, reject) => {
    try {
      const db = await pool.connect();
      let products = await db.query(`SELECT * FROM products where product_id = '${productId}';`);

      if (products.rowCount == 0) {
        let err = 'Entered product id does not exist!';
        reject({
          error: err,
        });
      }
      if (products.rowCount > 1) {
        let err = 'product id should be unique';
        reject({
          error: err,
        });
      }
      resolve(products.rows[0]);
    } catch (err) {
      var msg = '';
      if (err.routine == 'auth_failed') {
        msg = 'Failed to connect to database';
      } else if (err.detail) {
        msg = err.detail;
      } else {
        msg = err.routine;
      }
      debug(err);
      reject({
        error: msg,
      });
    }
  });
};
