const debug = require('debug')('api:routes:account:purchase');
const purchase = require('../controllers/purchase');
const payment = require('../controllers/account/payment');
const errorTokens = require('../error-token');

// lock
var IS_IN_PURCHASE = false;

module.exports.makePurchase = function (req, res) {
  if (IS_IN_PURCHASE) {
    res.status(404).json({
      error: errorTokens.OP_FAILED,
    });
    return;
  }

  // add lock
  IS_IN_PURCHASE = true;

  let email = req.email;
  debug(`account with ${email} is making a purchase`);

  debug('step 1: starting validate purchase');
  purchase
    .validatePurchase(req.body)
    .then((purchaseInfo) => {
      debug('step 2: starting validate stock');
      purchase
        .validateStock(purchaseInfo)
        .then((currentStock) => {
          debug('step 3: starting make payment');

          payment
            .makePayment(email, purchaseInfo.subtotal)
            .then((paymentIntentId) => {
              debug(
                'step 4: starting update stock, adding to the list of orders, and logging the order'
              );

              purchase
                .updateStockAndCreateOrder(email, paymentIntentId, req.body, currentStock)
                .then(() => {
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
    })
    .catch((err) => {
      debug(err);
      res.status(404).json({
        error: errorTokens.VALIDATE_FAILED,
      });
    })
    .finally(() => {
      // remove lock
      IS_IN_PURCHASE = false;
    });
};
