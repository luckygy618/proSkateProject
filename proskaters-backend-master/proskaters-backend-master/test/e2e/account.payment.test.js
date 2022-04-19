const debug = require('debug')('api:test:e2e:account:payment');
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

  let registerData = {
    email: 'thisisatest@gmail.com',
    password: '1234Password',
    confirmPassword: '1234Password',
  };

  let loginData = {
    email: 'thisisatest@gmail.com',
    password: '1234Password',
  };

  let invalidPaymentData = {
    type: '',
    card: {
      number: '4242424242424242',
      exp_month: 2,
      exp_year: 2023,
      cvc: '314',
    },
  };

  let validPaymentData = {
    type: 'card',
    card: {
      number: '4242424242424242',
      exp_month: 12,
      exp_year: 2030,
      cvc: '314',
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

  it('should fail for saving an invalid payment method', () => {
    request(app)
      .put('/account/payment')
      .send(invalidPaymentData)
      .set('Authorization', `Bearer ${authToken}`)
      .expect(404);
  });

  it('should succeed for saving a valid payment method', (done) => {
    request(app)
      .put('/account/payment')
      .send(validPaymentData)
      .set('Authorization', `Bearer ${authToken}`)
      .expect(200)
      .end((err, res) => {
        expect(res.body).toHaveProperty('token');
        expect(res.body).toHaveProperty('email');
        done();
      });
  });
});
