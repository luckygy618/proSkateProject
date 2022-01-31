const debug = require('debug')('api:controllers:account');
const Joi = require('joi');
const bcrypt = require('bcrypt');
const pool = require('../database/pool');

const ROUNDS = 10;

const registerSchema = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: {
        allow: ['com', 'net', 'ca'],
      },
    })
    .min(10)
    .max(30)
    .required(),
  password: Joi.string()
    .regex(/^[a-zA-Z0-9]*$/)
    .min(8)
    .max(20)
    .required(),
  confirmPassword: Joi.string()
    .regex(/^[a-zA-Z0-9]*$/)
    .min(8)
    .max(20)
    .required(),
});

const loginSchema = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: {
        allow: ['com', 'net', 'ca'],
      },
    })
    .min(10)
    .max(30)
    .required(),
  password: Joi.string()
    .regex(/^[a-zA-Z0-9]*$/)
    .min(8)
    .max(20)
    .required(),
});

const tokenSchema = Joi.object({
  token: Joi.string()
    .regex(/^[a-zA-Z0-9._-]*$/)
    .min(50)
    .max(225)
    .required(),
});

module.exports.validateToken = function (item) {
  return new Promise((resolve, reject) => {
    try {
      result = Joi.attempt(item, tokenSchema);
      resolve(result);
    } catch (err) {
      debug(err);
      reject({
        error: err.details[0].message,
      });
    }
  });
};

module.exports.validateRegister = function (item) {
  return new Promise((resolve, reject) => {
    try {
      result = Joi.attempt(item, registerSchema);

      if (item.password === item.confirmPassword) {
        resolve(result);
      } else {
        let message = 'password does not match confirm password.';
        reject({
          error: message,
        });
      }
    } catch (err) {
      debug(err);

      reject({
        error: err.details[0].message,
      });
    }
  });
};

module.exports.registerAccount = function (item) {
  return new Promise(async (resolve, reject) => {
    try {
      const db = await pool.connect();
      let salt = await bcrypt.genSalt(ROUNDS);
      let passhash = await bcrypt.hash(item.password, salt);

      var sql = `INSERT INTO accounts (email, passhash) VALUES ('${item.email}', '${passhash}');`;

      let result = await db.query(sql);

      if (result.rowCount == 1) {
        let msg = { message: 'Account registration success.' };
        resolve({
          message: msg,
        });
      } else {
        let msg = 'Faild to insert registration to database.';
        reject({
          error: msg,
        });
      }
    } catch (err) {
      debug(err);
      var msg = 'Faild to insert registration to database.';
      if (err.detail) {
        msg = err.detail;
      } else {
        if (err.routine == 'auth_failed') {
          msg = 'Failed to connect to database';
        }
      }
      reject({
        error: msg,
      });
    }
  });
};

module.exports.validateLogin = function (item) {
  return new Promise((resolve, reject) => {
    try {
      result = Joi.attempt(item, loginSchema);
      resolve(result);
    } catch (err) {
      debug(err);
      reject({
        error: err.details[0].message,
      });
    }
  });
};

module.exports.verifyAccount = function (item) {
  return new Promise(async (resolve, reject) => {
    try {
      const db = await pool.connect();
      let accounts = await db.query(`SELECT * FROM accounts WHERE email = '${item.email}';`);
      if (accounts.rowCount == 0) {
        let err = 'account not found for email ' + item.email;
        reject({
          error: err,
        });
      }

      if (accounts.rowCount > 1) {
        let err = 'multiple accounts found for email ' + item.email;
        reject({
          error: err,
        });
      }

      let account = accounts.rows[0];
      bcrypt
        .compare(item.password, account.passhash)
        .then((result) => {
          if (result == true) {
            resolve(result);
          } else {
            let msg = 'incorrect password.';
            debug(msg);
            reject({
              error: msg,
            });
          }
        })
        .catch((err) => {
          debug(err);
          reject({
            error: err,
          });
        });
    } catch (err) {
      var msg = '';
      if (err.detail) {
        msg = err.detail;
      } else if (err.routine == 'auth_failed') {
        msg = 'Failed to connect to database';
      } else {
        msg = err;
      }

      debug(err);
      reject({
        error: msg,
      });
    }
  });
};
