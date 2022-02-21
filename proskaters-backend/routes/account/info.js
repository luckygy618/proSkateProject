const debug = require('debug')('api:routes:account:info');
const info = require('../../controllers/account/info');
const errorTokens = require('../../error-token');

module.exports.updateAccountInfo = function (req, res) {
  let email = req.email;
  debug(`updating account information for email ${email}`);

  info
    .validateInfo(req.body)
    .then((data) => {
      info
        .updateAccountInfo(data, email)
        .then(() => {
          res.send(errorTokens.SUCCESS);
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

module.exports.getAccountInfo = function (req, res) {
  let email = req.email;
  debug(`retrieving account information for email ${email}`);

  info
    .getAccountInfo(email)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      debug(err);
      res.status(404).json({
        error: errorTokens.OP_FAILED,
      });
    });
};
