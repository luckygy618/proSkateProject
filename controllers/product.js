const debug = require("debug")("controllers:product");
const Joi = require("joi");
const pool = require("../database/pool");

const productSchema = Joi.object({
  product_id: Joi.string().required(),
  product_name: Joi.string().required(),
  image: Joi.string().required(),
  price: Joi.number().precision(2).required(),
  stock_amount: Joi.number(),
  sku: Joi.string(),
  brand: Joi.string(),
  intro: Joi.string(),
  description: Joi.string(),
  stock_status: Joi.string(),
  rating: Joi.number(),
});

module.exports.getAllProducts = function () {
  return new Promise(async (resolve, reject) => {
    const db = await pool.connect();
    try {
      let products = await db.query("SELECT * FROM product_list");
      resolve(products.rows);
    } catch (err) {
      reject(err);
    }
  });
};

module.exports.validateProduct = function (product) {
  return new Promise(async (resolve, reject) => {
    try {
      result = await productSchema.validate(product);
      resolve(result);
    } catch (err) {
      reject(err);
    }
  });
};



module.exports.addProduct = function (data) {
  return new Promise(async (resolve, reject) => {
    const db = await pool.connect();
    try {
      const item = await Joi.attempt(data, productSchema);
      var sql_insert = `INSERT INTO product_list(product_id, product_name, image, price, stock_amount, sku, brand, intro,description,stock_status,rating) VALUES ('${item.product_id}','${item.product_name}','${item.image}',${item.price},${item.stock_amount},'${item.sku}','${item.brand}','${item.intro}','${item.description}','${item.stock_status}',${item.rating});`;
      let result = await db.query(sql_insert);
      let products = await db.query(`SELECT * FROM product_list where product_id = '${item.product_id}';`);
      if (products.rowCount == 0) {
        let err = "Insert product failed! ";
        reject(err);
      }
      resolve(products.rows);
    } catch (err) {
      reject(err);
    }
  });
};


module.exports.updateProduct = function (data) {
  return new Promise(async (resolve, reject) => {
    const db = await pool.connect();

    try {
      const item = await Joi.attempt(data, productSchema);
      let products = await db.query(`SELECT * FROM product_list where product_id = '${item.product_id}';`);
      if (products.rowCount == 0) {
        let err = "Entered product id does not exist! ";
        reject(err);
      }
      var sql_update = `UPDATE product_list SET product_id = '${item.product_id}', product_name = '${item.product_name}', image = '${item.image}',  price= ${item.price}, stock_amount =  ${item.stock_amount}, sku='${item.sku}',brand = '${item.brand}',intro='${item.intro}',description='${item.description}',stock_status='${item.stock_status}',rating=${item.rating} where product_id = '${item.product_id}';`;

      let result = await db.query(sql_update);
      if (result.rowCount == 1) {
        let product = await db.query(`SELECT * FROM product_list where product_id = '${item.product_id}';`);
        resolve(product.rows);
      } else {
        let err = "Update product failed! ";
        reject(err);
      }
    } catch (err) {
      console.log(err);
      reject(err);
    }
  });
};


module.exports.deleteProduct = function (data) {
  return new Promise(async (resolve, reject) => {
    const db = await pool.connect();

    try {
      const item = await Joi.attempt(data, productSchema);
      let products = await db.query(`SELECT * FROM product_list where product_id = '${item.product_id}';`);
      if (products.rowCount == 0) {
        let err = "Entered product id does not exist! ";
        reject(err);
      }
      var sql_delete = `delete from product_list where product_id = '${item.product_id}';`;
      let result = await db.query(sql_delete);
      if (result.rowCount == 1) {
        let message = "Product deleted!";
        resolve(message);
      } else {
        let err = "Delete product failed! ";
        reject(err);
      }
    } catch (err) {
      console.log(err);
      reject(err);
    }
  });
};



module.exports.findProduct = function (data) {
  return new Promise(async (resolve, reject) => {
    const db = await pool.connect();

    try {
      const item = await Joi.attempt(data, productSchema);
      let products = await db.query(`SELECT * FROM product_list where product_id = '${item.product_id}';`);
      if (products.rowCount == 0) {
        let err = "Entered product id does not exist! ";
        reject(err);
      }
      resolve(products.rows);
    } catch (err) {
      console.log(err);
      reject(err);
    }
  });
};