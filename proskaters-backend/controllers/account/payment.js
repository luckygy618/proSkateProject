const debug = require('debug')('api:controllers:account:payment');
const Joi = require('joi');
const pool = require('../../database/pool');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2020-08-27',
});

const paymentSchema = Joi.object({
  type: Joi.string().valid('card').required(), // TODO: expand in the future to include more payment types
  card: Joi.object({
    number: Joi.string()
      .min(16)
      .max(20)
      .required()
      .regex(/^[0-9]{16,20}$/),
    exp_month: Joi.number().min(1).max(12).required(),
    exp_year: Joi.number().min(2022).max(3000).required(),
    cvc: Joi.string()
      .min(3)
      .max(3)
      .required()
      .regex(/^[0-9]{3}$/),
  }).required(),
});

module.exports.validatePayment = function (item) {
  return new Promise((resolve, reject) => {
    try {
      result = Joi.attempt(item, paymentSchema);
      resolve(result);
    } catch (err) {
      debug(err);
      reject(err);
    }
  });
};

module.exports.updatePaymentInfo = function (paymentInfo, email) {
  return new Promise(async (resolve, reject) => {
    var db;
    try {
      db = await pool.connect();
      var paymentMethod = await stripe.paymentMethods.create(paymentInfo);
      var sql = `UPDATE accounts SET payment_token = '${paymentMethod.id}' WHERE email = '${email}';`;
      let rows = await db.query(sql);

      if (rows.rowCount == 1) {
        resolve(paymentMethod.id);
      } else {
        reject(`Failed to add payment method for account ${email}`);
      }
    } catch (err) {
      debug(err);
      reject(err);
    } finally {
      db.release(true);
    }
  });
};
