const debug = require('debug')('api:routes:account:payment');
const payments = require('../../controllers/account/payment');
const errorTokens = require('../../error-token');

module.exports.updatePaymentInfo = function (req, res) {
  let email = req.email;
  debug(`saving payment information for account with ${email}`);

  payments
    .validatePayment(req.body)
    .then((paymentInfo) => {
      payments
        .updatePaymentInfo(paymentInfo, email)
        .then((data) => {
          res.json({
            email: email,
            token: data,
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
