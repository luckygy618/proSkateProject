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
const product = require('./routes/product');
const purchase = require('./routes/purchase');
const order = require('./routes/order');
const authentication = require('./routes/account/authentication');
const payment = require('./routes/account/payment');
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

app.post('/images/add', product.uploadImage);

app.get('/products', product.getAllProducts);
app.post('/products/add', product.addProduct);
app.get('/products/:product_id', product.getProduct);
app.put('/products/:product_id', product.updateProduct);
app.delete('/products/:product_id', product.deleteProduct);

app.post('/account/register', authentication.register);
app.post('/account/login', authentication.login);
app.put('/account/password', checkToken, authentication.updatePassword);

app.put('/account/payment', checkToken, payment.updatePaymentInfo);

app.put('/account/info', checkToken, info.updateAccountInfo);
app.get('/account/info', checkToken, info.getAccountInfo);

app.put('/account/purchase', checkToken, purchase.makePurchase);

app.get('/account/orders', checkToken, order.getOrdersByEmail);
app.get('/account/orders/:order_id', checkToken, order.getOrderById);

app.put('/account/orders/refunding/:order_id', checkToken, order.markOrderAsRefunding);
app.put('/account/orders/shipped/:order_id', checkToken, order.markOrderAsShipped);
app.put('/account/orders/delivered/:order_id', checkToken, order.markOrderAsDelivered);
app.put('/account/orders/canceled/:order_id', checkToken, order.markOrderAsCanceled);

app.use((req, res) => {
  debug('visiting non existing resource');
  res.status(404).send('Resource not found');
});

module.exports = app;
