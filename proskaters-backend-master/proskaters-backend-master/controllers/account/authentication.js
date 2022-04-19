const debug = require('debug')('api:controllers:account:authentication');
const Joi = require('joi');
const bcrypt = require('bcrypt');
const pool = require('../../database/pool');

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

const updatePasswordSchema = Joi.object({
  currentPassword: Joi.string()
    .regex(/^[a-zA-Z0-9]*$/)
    .min(8)
    .max(20)
    .required(),
  newPassword: Joi.string()
    .regex(/^[a-zA-Z0-9]*$/)
    .min(8)
    .max(20)
    .required(),
  confirmNewPassword: Joi.string()
    .regex(/^[a-zA-Z0-9]*$/)
    .min(8)
    .max(20)
    .required(),
});

module.exports.validateRegister = function (item) {
  return new Promise((resolve, reject) => {
    try {
      result = Joi.attempt(item, registerSchema);

      if (item.password === item.confirmPassword) {
        resolve(result);
      } else {
        throw new Error('password does not match confirm password.');
      }
    } catch (err) {
      debug(err);
      reject(err);
    }
  });
};

module.exports.registerAccount = function (item) {
  return new Promise(async (resolve, reject) => {
    var db;
    try {
      db = await pool.connect();
      let salt = await bcrypt.genSalt(ROUNDS);
      let passhash = await bcrypt.hash(item.password, salt);

      var sql = `INSERT INTO accounts (email, passhash) VALUES ('${item.email}', '${passhash}') RETURNING id;`;
      let result = await db.query(sql);
      if (result.rowCount == 1) {
        resolve(result.rows[0]);
      } else {
        throw new Error(`Failed to register account ${item.email} into database.`);
      }
    } catch (err) {
      debug(err);
      reject(err);
    } finally {
      db.release(true);
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
      reject(err);
    }
  });
};

module.exports.verifyAccount = function (item) {
  return new Promise(async (resolve, reject) => {
    var db;
    try {
      db = await pool.connect();
      let accounts = await db.query(`SELECT * FROM accounts WHERE email = '${item.email}';`);
      if (accounts.rowCount == 0) {
        throw new Error(`account not found for email ${item.email}`);
      }

      if (accounts.rowCount > 1) {
        throw new Error(`multiple accounts found for email ${item.email}`);
      }

      let account = accounts.rows[0];
      var match = await bcrypt.compareSync(item.password, account.passhash);
      if (!match) {
        throw new Error(`Incorrect password entered for account ${item.email}`);
      }

      resolve(match);
    } catch (err) {
      debug(err);
      reject(err);
    } finally {
      db.release(true);
    }
  });
};

module.exports.validateUpdatePassword = function (item) {
  return new Promise((resolve, reject) => {
    try {
      result = Joi.attempt(item, updatePasswordSchema);
      if (item.newPassword === item.confirmNewPassword) {
        resolve(result);
      } else {
        throw new Error('password does not match confirm password.');
      }
    } catch (err) {
      debug(err);
      reject(err);
    }
  });
};

module.exports.updatePassword = function (item, email) {
  return new Promise(async (resolve, reject) => {
    var db;
    try {
      db = await pool.connect();

      var result = await db.query(`SELECT passhash FROM accounts where email = '${email}';`);
      if (result.rowCount != 1) {
        throw new Error(`Email does not exist for account ${email}`);
      }

      var match = await bcrypt.compareSync(item.currentPassword, result.rows[0].passhash);
      if (!match) {
        throw new Error(`Invalid current password for account ${email}`);
      }

      let salt = await bcrypt.genSalt(ROUNDS);
      let newPasshash = await bcrypt.hash(item.newPassword, salt);
      var sql = `UPDATE accounts SET passhash = '${newPasshash}' WHERE email = '${email}';`;
      let rows = await db.query(sql);

      if (rows.rowCount == 1) {
        resolve(`Updated password for account ${email}`);
      } else {
        throw new Error(`Failed to update password for account ${email}`);
      }
    } catch (err) {
      debug(err);
      reject(err);
    } finally {
      db.release(true);
    }
  });
};
