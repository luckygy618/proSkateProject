const debug = require('debug')('api:controllers:account:info');
const Joi = require('joi');
const pool = require('../../database/pool');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2020-08-27',
});

const addressSchema = Joi.object({
  address1: Joi.string()
    .regex(/^[a-zA-Z0-9 ,.-]*$/)
    .max(40)
    .allow('', null),
  address2: Joi.string()
    .regex(/^[a-zA-Z0-9 ,.-]*$/)
    .max(40)
    .allow('', null),
  city: Joi.string()
    .regex(/^[a-zA-Z ,.-]*$/)
    .max(20)
    .allow('', null),
  province: Joi.string()
    .regex(/^[a-zA-Z ,.-]*$/)
    .max(20)
    .allow('', null),
  country: Joi.string()
    .regex(/^[a-zA-Z ,.-]*$/)
    .max(20)
    .allow('', null),
  postalCode: Joi.string()
    .regex(/^[a-zA-Z0-9 ]*$/)
    .max(7)
    .allow('', null),
});

const infoSchema = Joi.object({
  salutation: Joi.string()
    .regex(/^[a-zA-Z.]*$/)
    .max(6)
    .allow('', null),
  firstName: Joi.string()
    .regex(/^[a-zA-Z]*$/)
    .max(20)
    .allow('', null),
  lastName: Joi.string()
    .regex(/^[a-zA-Z]*$/)
    .max(20)
    .allow('', null),
  phoneNumber: Joi.string()
    .regex(/^[0-9 -]*$/)
    .max(15)
    .allow('', null),
  shippingAddress: addressSchema,
  billingAddress: addressSchema,
});

module.exports.validateInfo = function (item) {
  return new Promise((resolve, reject) => {
    try {
      result = Joi.attempt(item, infoSchema);
      resolve(result);
    } catch (err) {
      debug(err);
      reject(err);
    }
  });
};

module.exports.updateAccountInfo = function (accountInfo, email) {
  return new Promise(async (resolve, reject) => {
    var db;
    try {
      db = await pool.connect();
      var sql = `UPDATE accounts SET 
      salutation = '${accountInfo.salutation}', 
      first_name = '${accountInfo.firstName}', 
      last_name = '${accountInfo.lastName}', 
      phone = '${accountInfo.phoneNumber}', 
      ship_address1 = '${accountInfo.shippingAddress.address1}', 
      ship_address2 = '${accountInfo.shippingAddress.address2}', 
      ship_city = '${accountInfo.shippingAddress.city}', 
      ship_province = '${accountInfo.shippingAddress.province}', 
      ship_country = '${accountInfo.shippingAddress.country}', 
      ship_postal = '${accountInfo.shippingAddress.postalCode}', 
      bill_address1 = '${accountInfo.billingAddress.address1}', 
      bill_address2 = '${accountInfo.billingAddress.address2}', 
      bill_city = '${accountInfo.billingAddress.city}', 
      bill_province = '${accountInfo.billingAddress.province}', 
      bill_country = '${accountInfo.billingAddress.country}', 
      bill_postal = '${accountInfo.billingAddress.postalCode}' 
      WHERE email = '${email}';`;

      let rows = await db.query(sql);
      if (rows.rowCount == 1) {
        resolve(rows);
      } else {
        throw new Error(`Failed to update info for account ${email}`);
      }
    } catch (err) {
      debug(err);
      reject(err);
    } finally {
      db.release(true);
    }
  });
};

module.exports.getAccountInfo = function (email) {
  return new Promise(async (resolve, reject) => {
    var db;
    try {
      db = await pool.connect();
      var sql = `SELECT 
      email, 
      salutation, 
      first_name, 
      last_name, 
      phone, 
      ship_address1, 
      ship_address2, 
      ship_city, 
      ship_province, 
      ship_country, 
      ship_postal, 
      bill_address1, 
      bill_address2, 
      bill_city, 
      bill_province, 
      bill_country, 
      bill_postal, 
      payment_token 
      FROM accounts WHERE email = '${email}';`;

      let result = await db.query(sql);
      if (result.rowCount == 0) {
        throw new Error(`Account information is not found for email ${email}`);
      }

      if (result.rowCount > 1) {
        throw new Error(`Multiple accounts found for email ${email}`);
        return;
      }

      var data = await transformData(result.rows[0]);
      resolve(data);
    } catch (err) {
      debug(err);
      reject(err);
    } finally {
      db.release(true);
    }
  });
};

transformData = async function (data) {
  var result = {};
  var shippingAddress = {};
  var billingAddress = {};

  result.shippingAddress = shippingAddress;
  result.billingAddress = billingAddress;

  shippingAddress.address1 = data.ship_address1;
  shippingAddress.address2 = data.ship_address2;
  shippingAddress.city = data.ship_city;
  shippingAddress.province = data.ship_province;
  shippingAddress.country = data.ship_country;
  shippingAddress.postalCode = data.ship_postal;

  billingAddress.address1 = data.bill_address1;
  billingAddress.address2 = data.bill_address2;
  billingAddress.city = data.bill_city;
  billingAddress.province = data.bill_province;
  billingAddress.country = data.bill_country;
  billingAddress.postalCode = data.bill_postal;

  result.email = data.email;
  result.salutation = data.salutation;
  result.firstName = data.first_name;
  result.lastName = data.last_name;
  result.phoneNumber = data.phone;
  result.paymentToken = data.payment_token;

  if (data.payment_token == null) {
    return result;
  }

  var paymentMethod = await stripe.paymentMethods.retrieve(data.payment_token);
  result.paymentInfo = paymentMethod;

  return result;
};
