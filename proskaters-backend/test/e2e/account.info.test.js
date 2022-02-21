const debug = require('debug')('api:test:e2e:account:info');
const request = require('supertest');
const app = require('../../app');
const pool = require('../../database/pool');
const setup = require('./setup');

let id = 0;

beforeAll(async () => {
  try {
    var db = await pool.connect();
    await db.query(setup.ACCOUNT_TABLE_CREATION);
  } catch (err) {
    debug(err);
  } finally {
    db.release(true);
  }
});

afterAll(async () => {
  try {
    // cleanup
    var db = await pool.connect();
    await db.query(`DELETE FROM accounts WHERE id = '${id}';`);
  } catch (err) {
    debug(err);
  } finally {
    db.release(true);
  }
});

describe('api endpoint testing', () => {
  let authToken;
  let paymentToken;

  let registerData = {
    email: 'justatest@gmail.com',
    password: '1234Password',
    confirmPassword: '1234Password',
  };

  let loginData = {
    email: 'justatest@gmail.com',
    password: '1234Password',
  };

  let paymentData = {
    type: 'card',
    card: {
      number: '4242424242424242',
      exp_month: 12,
      exp_year: 2030,
      cvc: '314',
    },
  };

  let invalidAccountInfo = {
    salutation: 'mr+.',
    firstName: 'renaldo',
    lastName: 'Clown',
    phoneNumber: '426-820-5972',
    shippingAddress: {
      address1: 'Unit 281, 1237 Apple Lane',
      city: 'Toronto',
      province: 'ON',
      country: 'Canada',
      postalCode: 'M2N 3L2',
    },
    billingAddress: {
      address1: '1237 Apple Lane',
      address2: 'Unit 281',
      city: 'Toronto',
      province: 'ON',
      country: 'Canada',
      postalCode: 'M2N 3L2',
    },
  };

  let validAccountInfo = {
    salutation: 'mr.',
    firstName: 'renaldo',
    lastName: 'Clown',
    phoneNumber: '426-820-5972',
    shippingAddress: {
      address1: 'Unit 281, 1237 Apple Lane',
      city: 'Toronto',
      province: 'ON',
      country: 'Canada',
      postalCode: 'M2N 3L2',
    },
    billingAddress: {
      address1: '1237 Apple Lane',
      address2: 'Unit 281',
      city: 'Toronto',
      province: 'ON',
      country: 'Canada',
      postalCode: 'M2N 3L2',
    },
  };

  it('registering account', (done) => {
    request(app)
      .post('/account/register')
      .send(registerData)
      .expect(200)
      .end((err, res) => {
        expect(res.body).toHaveProperty('id');
        id = res.body.id;
        done();
      });
  });

  it('logging in with valid credentials', (done) => {
    request(app)
      .post('/account/login')
      .send(loginData)
      .expect(200)
      .end((err, res) => {
        expect(res.body).toHaveProperty('token');
        authToken = res.body.token;
        done();
      });
  });

  it('should fail for updating with invalid account info', () => {
    request(app)
      .put('/account/info')
      .send(invalidAccountInfo)
      .set('Authorization', `Bearer ${authToken}`)
      .expect(404);
  });

  it('should not fail for retrieving empty account info', (done) => {
    request(app)
      .get('/account/info')
      .set('Authorization', `Bearer ${authToken}`)
      .expect(200)
      .end((err, res) => {
        expect(res.body).toHaveProperty('shippingAddress');
        expect(res.body).toHaveProperty('billingAddress');
        expect(res.body).toHaveProperty('email');
        expect(res.body).toHaveProperty('salutation');
        expect(res.body).toHaveProperty('firstName');
        expect(res.body).toHaveProperty('lastName');
        expect(res.body).toHaveProperty('phoneNumber');
        expect(res.body).toHaveProperty('paymentToken');

        expect(res.body.shippingAddress).toHaveProperty('address1');
        expect(res.body.shippingAddress).toHaveProperty('address2');
        expect(res.body.shippingAddress).toHaveProperty('city');
        expect(res.body.shippingAddress).toHaveProperty('province');
        expect(res.body.shippingAddress).toHaveProperty('country');
        expect(res.body.shippingAddress).toHaveProperty('postalCode');

        expect(res.body.billingAddress).toHaveProperty('address1');
        expect(res.body.billingAddress).toHaveProperty('address2');
        expect(res.body.billingAddress).toHaveProperty('city');
        expect(res.body.billingAddress).toHaveProperty('province');
        expect(res.body.billingAddress).toHaveProperty('country');
        expect(res.body.billingAddress).toHaveProperty('postalCode');
        done();
      });
  });

  it('should not fail for updating with valid account info', () => {
    request(app)
      .put('/account/info')
      .send(validAccountInfo)
      .set('Authorization', `Bearer ${authToken}`)
      .expect(200);
  });

  it('should not fail for retrieving account info but empty payment token', (done) => {
    request(app)
      .get('/account/info')
      .set('Authorization', `Bearer ${authToken}`)
      .expect(200)
      .end((err, res) => {
        expect(res.body).toHaveProperty('shippingAddress');
        expect(res.body).toHaveProperty('billingAddress');
        expect(res.body).toHaveProperty('email');
        expect(res.body).toHaveProperty('salutation');
        expect(res.body).toHaveProperty('firstName');
        expect(res.body).toHaveProperty('lastName');
        expect(res.body).toHaveProperty('phoneNumber');
        expect(res.body).toHaveProperty('paymentToken');

        expect(res.body.shippingAddress).toHaveProperty('address1');
        expect(res.body.shippingAddress).toHaveProperty('address2');
        expect(res.body.shippingAddress).toHaveProperty('city');
        expect(res.body.shippingAddress).toHaveProperty('province');
        expect(res.body.shippingAddress).toHaveProperty('country');
        expect(res.body.shippingAddress).toHaveProperty('postalCode');

        expect(res.body.billingAddress).toHaveProperty('address1');
        expect(res.body.billingAddress).toHaveProperty('address2');
        expect(res.body.billingAddress).toHaveProperty('city');
        expect(res.body.billingAddress).toHaveProperty('province');
        expect(res.body.billingAddress).toHaveProperty('country');
        expect(res.body.billingAddress).toHaveProperty('postalCode');
        done();
      });
  });

  it('should succeed for saving a valid payment method', (done) => {
    request(app)
      .put('/account/payment')
      .send(paymentData)
      .set('Authorization', `Bearer ${authToken}`)
      .expect(200)
      .end((err, res) => {
        expect(res.body).toHaveProperty('token');
        expect(res.body).toHaveProperty('email');
        paymentToken = res.body.token;
        done();
      });
  });

  it('should not fail for retrieving full account info', (done) => {
    request(app)
      .get('/account/info')
      .set('Authorization', `Bearer ${authToken}`)
      .expect(200)
      .end((err, res) => {
        expect(res.body).toHaveProperty('shippingAddress');
        expect(res.body).toHaveProperty('billingAddress');
        expect(res.body).toHaveProperty('email');
        expect(res.body).toHaveProperty('salutation');
        expect(res.body).toHaveProperty('firstName');
        expect(res.body).toHaveProperty('lastName');
        expect(res.body).toHaveProperty('phoneNumber');
        expect(res.body).toHaveProperty('paymentToken');

        expect(res.body.shippingAddress).toHaveProperty('address1');
        expect(res.body.shippingAddress).toHaveProperty('address2');
        expect(res.body.shippingAddress).toHaveProperty('city');
        expect(res.body.shippingAddress).toHaveProperty('province');
        expect(res.body.shippingAddress).toHaveProperty('country');
        expect(res.body.shippingAddress).toHaveProperty('postalCode');

        expect(res.body.billingAddress).toHaveProperty('address1');
        expect(res.body.billingAddress).toHaveProperty('address2');
        expect(res.body.billingAddress).toHaveProperty('city');
        expect(res.body.billingAddress).toHaveProperty('province');
        expect(res.body.billingAddress).toHaveProperty('country');
        expect(res.body.billingAddress).toHaveProperty('postalCode');

        expect(paymentToken).toEqual(res.body.paymentToken);
        done();
      });
  });
});
