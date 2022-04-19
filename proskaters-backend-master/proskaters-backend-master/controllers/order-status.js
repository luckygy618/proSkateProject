const debug = require('debug')('api:controllers:order-status');

module.exports.STATUS_ORDERED = 'ordered';
module.exports.STATUS_SHIPPED = 'shipped';
module.exports.STATUS_DELIVERED = 'delivered';
module.exports.STATUS_CANCELED = 'canceled';
module.exports.STATUS_REFUNDING = 'refunding';
module.exports.STATUS_REFUNDED = 'refunded';
