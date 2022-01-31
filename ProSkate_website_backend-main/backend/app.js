require('dotenv').config();

const debug = require('debug')('api:app');
const express = require('express');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(express.static('public'));

const products = require('./controllers/product');
const upload = require('./database/filestorage');

const accounts = require('./controllers/account');

const jwt = require('./utils/jwt');

const checkToken = (req, res, next) => {
  const header = req.headers['authorization'];
  if (typeof header == 'undefined' || header == null) {
    res.status(403).json({
      message: `invalid header`,
    });
  } else {
    const bearer = header.split(' ');
    const token = bearer[1];

    jwt
      .verify(token)
      .then((data) => {
        next();
      })
      .catch((err) => {
        res.status(403).json({
          message: err,
        });
      });
  }
};

app.get('/', (req, res) => {
  debug('visiting root');
  res.sendFile(path.join(__dirname, '/index.html'));
});

app.post('/images/add', (req, res) => {
  debug('uploading an image file');
  try {
    let action = upload.single('image_file');
    action(req, res, function (err) {
      if (err) {
        throw err;
      }
    });
    res.json({
      message: 'image upload successful',
    });
  } catch (error) {
    res.status(404).json({
      message: error,
    });
  }
});

// Get all products
app.get('/products', (req, res) => {
  debug('retrieving all products');
  products
    .getAllProducts()
    .then((data) => {
      res.json(data);
    })
    .catch((error) =>
      res.status(404).json({
        message: error,
      })
    );
});

app.post('/products/add', async (req, res) => {
  debug('adding a product');
  products
    .validateProduct(req.body)
    .then((data) => {
      products
        .addProduct(data)
        .then((result) => {
          res.json({
            message: result,
          });
        })
        .catch((error) =>
          res.status(404).json({
            message: error,
          })
        );
    })
    .catch((error) =>
      res.status(404).json({
        message: error,
      })
    );
});

app.get('/products/:product_id', async (req, res) => {
  debug('getting product with id ' + req.params.product_id);
  products
    .getProduct(req.params.product_id)
    .then((result) => {
      res.json(result);
    })
    .catch((error) =>
      res.status(404).json({
        message: error,
      })
    );
});

app.put('/products/:product_id', async (req, res) => {
  debug('updating product with id ' + req.params.product_id);
  products
    .validateProduct(req.body)
    .then((data) => {
      products
        .updateProduct(req.params.product_id, data)
        .then((result) => {
          res.json({
            message: result,
          });
        })
        .catch((error) =>
          res.status(404).json({
            message: error,
          })
        );
    })
    .catch((error) =>
      res.status(404).json({
        message: error,
      })
    );
});

app.delete('/products/:product_id', async (req, res) => {
  debug('deleting product with id ' + req.params.product_id);
  products
    .deleteProduct(req.params.product_id)
    .then((result) => {
      res.json({
        message: result,
      });
    })
    .catch((error) =>
      res.status(404).json({
        message: error,
      })
    );
});

app.post('/account/register', async (req, res) => {
  debug('registering an account');
  accounts
    .validateRegister(req.body)
    .then((data) => {
      accounts
        .registerAccount(data)
        .then((result) => {
          res.json(result);
        })
        .catch((err) => {
          res.status(404).json({
            message: err,
          });
        });
    })
    .catch((err) => {
      res.status(404).json({
        message: err,
      });
    });
});

app.post('/account/login', async (req, res) => {
  debug('login with an account');
  accounts
    .validateLogin(req.body)
    .then((data) => {
      accounts
        .verifyAccount(data)
        .then((result) => {
          debug(result);

          jwt
            .sign(req.body)
            .then((token) => {
              res.json({ token: token });
            })
            .catch((err) => {
              res.status(404).json({
                message: err,
              });
            });
        })
        .catch((err) =>
          res.status(404).json({
            message: err,
          })
        );
    })
    .catch((err) =>
      res.status(404).json({
        message: err,
      })
    );
});

app.post('/account/validate', async (req, res) => {
  debug('validate a jwt token');
  accounts
    .validateToken(req.body)
    .then((data) => {
      jwt
        .verify(data.token)
        .then((decoded) => {
          var newDecode = { email: decoded.email, password: decoded.password };

          jwt
            .sign(newDecode)
            .then((token) => {
              res.json({ token: token });
            })
            .catch((err) => {
              res.status(404).json({
                message: err,
              });
            });
        })
        .catch((err) => {
          res.status(404).json({
            message: err,
          });
        });
    })
    .catch((err) => {
      res.status(404).json({
        message: err,
      });
    });
});

app.use((req, res) => {
  debug('visiting non existing resource');
  res.status(404).send('Resource not found');
});

module.exports = app;
