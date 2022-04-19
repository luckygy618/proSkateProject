const debug = require('debug')('api:routes:product');
const product = require('../controllers/product');
const errorTokens = require('../error-token');
const upload = require('../database/filestorage');

module.exports.uploadImage = function (req, res) {
  debug('uploading an image file');
  try {
    let action = upload.single('image_file');
    action(req, res, function (err) {
      if (err) {
        throw err;
      }
    });
    res.json({ message: errorTokens.SUCCESS });
  } catch (error) {
    debug(error);
    res.status(404).json({
      error: errorTokens.OP_FAILED,
    });
  }
};

module.exports.getAllProducts = function (req, res) {
  debug('retrieving all products');
  product
    .getAllProducts()
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

module.exports.addProduct = function (req, res) {
  debug('adding a product');
  product
    .validateProduct(req.body)
    .then((data) => {
      product
        .addProduct(data)
        .then((result) => {
          res.json({ product_id: result });
        })
        .catch((error) => {
          debug(error);
          res.status(404).json({
            error: errorTokens.OP_FAILED,
          });
        });
    })
    .catch((error) => {
      debug(error);
      res.status(404).json({
        error: errorTokens.VALIDATE_FAILED,
      });
    });
};

module.exports.getProduct = function (req, res) {
  debug('getting product with id ' + req.params.product_id);
  product
    .getProduct(req.params.product_id)
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      debug(error);
      res.status(404).json({
        error: errorTokens.OP_FAILED,
      });
    });
};

module.exports.updateProduct = function (req, res) {
  debug('updating product with id ' + req.params.product_id);
  product
    .validateProduct(req.body)
    .then((data) => {
      product
        .updateProduct(req.params.product_id, data)
        .then(() => {
          res.json({ message: errorTokens.SUCCESS });
        })
        .catch((error) => {
          debug(error);
          res.status(404).json({
            error: errorTokens.OP_FAILED,
          });
        });
    })
    .catch((error) => {
      debug(error);
      res.status(404).json({
        error: errorTokens.VALIDATE_FAILED,
      });
    });
};

module.exports.deleteProduct = function (req, res) {
  debug('deleting product with id ' + req.params.product_id);
  product
    .deleteProduct(req.params.product_id)
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
