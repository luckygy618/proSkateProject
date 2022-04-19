const debug = require('debug')('api:routes:order');
const order = require('../controllers/order');
const errorTokens = require('../error-token');
const orderStatus = require('../controllers/order-status');

module.exports.getOrderById = function (req, res) {
  let email = req.email;
  let order_id = req.params.order_id;
  debug(`account with ${email} is getting an order by id ${order_id}`);

  order
    .getOrderById(order_id)
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      debug(error);
      res.status(404).json({
        error: errorTokens.OP_FAILED,
      });
    });
};

module.exports.getOrdersByEmail = function (req, res) {
  let email = req.email;
  debug(`account with ${email} is getting all its orders`);

  order
    .getOrdersByEmail(email)
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      debug(error);
      res.status(404).json({
        error: errorTokens.OP_FAILED,
      });
    });
};

markOrderAsStatus = function (req, res, status) {
  let email = req.email;
  let order_id = req.params.order_id;
  debug(`account with ${email}'s order with id ${order_id} is being marked as status ${status}`);

  order
    .updateOrderStatus(order_id, status)
    .then(() => {
      res.json({ message: errorTokens.SUCCESS });
    })
    .catch((error) => {
      debug(error);
      res.status(404).json({
        error: errorTokens.OP_FAILED,
      });
    });
};

module.exports.markOrderAsRefunding = function (req, res) {
  markOrderAsStatus(req, res, orderStatus.STATUS_REFUNDING);
};

module.exports.markOrderAsCanceled = function (req, res) {
  markOrderAsStatus(req, res, orderStatus.STATUS_CANCELED);
};

module.exports.markOrderAsShipped = function (req, res) {
  markOrderAsStatus(req, res, orderStatus.STATUS_SHIPPED);
};

module.exports.markOrderAsDelivered = function (req, res) {
  markOrderAsStatus(req, res, orderStatus.STATUS_DELIVERED);
};
