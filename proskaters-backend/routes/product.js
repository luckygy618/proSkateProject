const debug = require('debug')('api:routes:product');
const products = require('../controllers/product');
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
    res.send(errorTokens.SUCCESS);
  } catch (error) {
    debug(error);
    res.status(404).json({
      error: errorTokens.OP_FAILED,
    });
  }
};

module.exports.getAllProducts = function (req, res) {
  debug('retrieving all products');
  products
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
  products
    .validateProduct(req.body)
    .then((data) => {
      products
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
  products
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
  products
    .validateProduct(req.body)
    .then((data) => {
      products
        .updateProduct(req.params.product_id, data)
        .then(() => {
          res.send(errorTokens.SUCCESS);
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
  products
    .deleteProduct(req.params.product_id)
    .then(() => {
      res.send(errorTokens.SUCCESS);
    })
    .catch((error) => {
      debug(error);
      res.status(404).json({
        error: errorTokens.OP_FAILED,
      });
    });
};
