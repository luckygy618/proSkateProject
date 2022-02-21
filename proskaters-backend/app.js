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

const jwt = require('./utils/jwt');
const products = require('./routes/product');
const authentication = require('./routes/account/authentication');
const payments = require('./routes/account/payment');
const info = require('./routes/account/info');
const errorTokens = require('./error-token');

const checkToken = (req, res, next) => {
  const header = req.headers['authorization'];
  if (typeof header == 'undefined' || header == null) {
    res.status(403).json({
      error: errorTokens.AUTH_FAILED,
    });
  } else {
    const bearer = header.split(' ');
    const token = bearer[1];

    jwt
      .verify(token)
      .then((decoded) => {
        req.email = decoded.email;
        next();
      })
      .catch((err) => {
        debug(err);
        res.status(403).json({
          error: errorTokens.AUTH_FAILED,
        });
      });
  }
};

app.get('/', (req, res) => {
  debug('visiting root');
  res.sendFile(path.join(__dirname, '/index.html'));
});

app.get('/protected', checkToken, (req, res) => {
  debug('visiting protected route');
  res.sendFile(path.join(__dirname, '/protected.html'));
});

app.post('/images/add', products.uploadImage);

app.get('/products', products.getAllProducts);
app.post('/products/add', products.addProduct);
app.get('/products/:product_id', checkToken, products.getProduct);
app.put('/products/:product_id', products.updateProduct);
app.delete('/products/:product_id', products.deleteProduct);

app.post('/account/register', authentication.register);
app.post('/account/login', authentication.login);

app.put('/account/payment', checkToken, payments.updatePaymentInfo);

app.put('/account/info', checkToken, info.updateAccountInfo);
app.get('/account/info', checkToken, info.getAccountInfo);

app.use((req, res) => {
  debug('visiting non existing resource');
  res.status(404).send('Resource not found');
});

module.exports = app;
