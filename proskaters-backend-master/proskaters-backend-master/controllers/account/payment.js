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
      var customer = await stripe.customers.create({
        description: 'default customer wrapper',
        payment_method: paymentMethod.id,
      });

      var sql = `UPDATE accounts SET payment_token = '${paymentMethod.id}', customer_token = '${customer.id}' WHERE email = '${email}';`;
      let rows = await db.query(sql);

      if (rows.rowCount == 1) {
        resolve(paymentMethod.id);
      } else {
        throw new Error(`Failed to add payment method for account ${email}`);
      }
    } catch (err) {
      debug(err);
      reject(err);
    } finally {
      db.release(true);
    }
  });
};

module.exports.makePayment = function (email, amount, currency = 'cad') {
  return new Promise(async (resolve, reject) => {
    var db;
    try {
      db = await pool.connect();

      var sql = `SELECT payment_token, customer_token FROM accounts WHERE email = '${email}';`;
      let result = await db.query(sql);
      if (result.rowCount == 0) {
        throw new Error(`Account is not found for email ${email}`);
      }

      result = result.rows[0];
      var paymentMethodId = result.payment_token;
      if (paymentMethodId == null) {
        throw new Error(`Payment token is not found for email ${email}`);
      }

      var customerId = result.customer_token;
      if (customerId == null) {
        throw new Error(`Customer token is not found for email ${email}`);
      }

      // create payment intent object
      var paymentIntent = await stripe.paymentIntents.create({
        amount: amount * 100, // ATTN: smallest currency unit, see API doc at https://stripe.com/docs/api/payment_intents/create
        currency: currency,
        customer: customerId,
        payment_method: paymentMethodId,
      });

      // confirm payment
      paymentIntent = await stripe.paymentIntents.confirm(paymentIntent.id);

      if (paymentIntent.status != 'succeeded') {
        throw new Error(
          `Stripe payment has failed for payment intent ${paymentIntent.id} with payment method ${paymentMethodId}`
        );
      }

      resolve(paymentIntent.id);
    } catch (err) {
      debug(err);
      reject(err);
    } finally {
      db.release(true);
    }
  });
};
