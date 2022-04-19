const debug = require('debug')('api:routes:account:authentication');
const authentication = require('../../controllers/account/authentication');
const errorTokens = require('../../error-token');
const jwt = require('../../utils/jwt');

module.exports.login = function (req, res) {
  debug('login with an account');
  authentication
    .validateLogin(req.body)
    .then((data) => {
      authentication
        .verifyAccount(data)
        .then((result) => {
          debug(result);

          jwt
            .sign(req.body)
            .then((token) => {
              res.json({ email: req.body.email, token: token });
            })
            .catch((err) => {
              ebug(err);
              res.status(404).json({
                error: errorTokens.OP_FAILED,
              });
            });
        })
        .catch((err) => {
          debug(err);
          res.status(404).json({
            error: errorTokens.OP_FAILED,
          });
        });
    })
    .catch((err) => {
      debug(err);
      res.status(404).json({
        error: errorTokens.VALIDATE_FAILED,
      });
    });
};

module.exports.register = function (req, res) {
  debug('registering an account');
  authentication
    .validateRegister(req.body)
    .then((data) => {
      authentication
        .registerAccount(data)
        .then((result) => {
          res.json(result);
        })
        .catch((err) => {
          debug(err);
          res.status(404).json({
            error: errorTokens.OP_FAILED,
          });
        });
    })
    .catch((err) => {
      debug(err);
      res.status(404).json({
        error: errorTokens.VALIDATE_FAILED,
      });
    });
};

module.exports.updatePassword = function (req, res) {
  debug(`updating password for email ${req.email}`);
  authentication
    .validateUpdatePassword(req.body)
    .then((data) => {
      authentication
        .updatePassword(data, req.email)
        .then((result) => {
          debug(result);
          res.json({ message: errorTokens.SUCCESS });
        })
        .catch((err) => {
          debug(err);
          res.status(404).json({
            error: errorTokens.OP_FAILED,
          });
        });
    })
    .catch((err) => {
      debug(err);
      res.status(404).json({
        error: errorTokens.VALIDATE_FAILED,
      });
    });
};
