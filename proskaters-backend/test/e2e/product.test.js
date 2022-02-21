const debug = require('debug')('api:test:e2e:product');
const request = require('supertest');
const app = require('../../app');
const pool = require('../../database/pool');
const setup = require('./setup');

let id = 0;

beforeAll(async () => {
  try {
    var db = await pool.connect();
    await db.query(setup.PRODUCT_TABLE_CREATION);
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

var testData = {
  product_id: 'SKDKFS1230',
  product_name: 'Shuang Jie Bang',
  image: 'image.jpg',
  price: 99.33,
  stock_amount: 12314,
  sku: 'what is this madness',
  brand: 'gucci',
  intro: 'a brief introduction',
  description: 'this is a first line \n this is a second line \n this is third line',
  stock_status: 'guess',
  rating: 4,
};

var badData = {
  product_id: '',
  product_name: 'Shuang Jie Bang',
  image: 'image.jpg',
  price: 99.33,
  stock_amount: 12314,
  sku: 'what is this madness',
  brand: 'gucci',
  intro: 'a brief introduction',
  description: 'this is a first line \n this is a second line \n this is third line',
  stock_status: 'guess',
  rating: 4,
};

describe('api endpoint testing', () => {
  let token;
  let registerData = {
    email: 'ragnarokatz@gmail.com',
    password: '1234Password',
    confirmPassword: '1234Password',
  };

  let loginData = {
    email: 'ragnarokatz@gmail.com',
    password: '1234Password',
  };

  it('registering account', (done) => {
    request(app)
      .post('/account/register')
      .send(registerData)
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
        token = res.body.token;
        done();
      });
  });

  it('visiting root', () => {
    return request(app).get('/').expect(200);
  });
  it('visiting undefined route', () => {
    return request(app).get('/undefined').expect(404);
  });

  it('adding a product', () => {
    return request(app).post('/products/add').send(testData).expect(200);
  });

  it('adding a product with bad data', () => {
    return request(app).post('/products/add').send(badData).expect(404);
  });

  it('adding a product with duplicate product id', () => {
    return request(app).post('/products/add').send(testData).expect(404);
  });

  it('visiting protected route', () => {
    return request(app).get('/protected').set('Authorization', `Bearer ${token}`).expect(200);
  });

  it('getting a product', (done) => {
    request(app)
      .get('/products/SKDKFS1230')
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .end((err, res) => {
        expect(res.body).toMatchObject(testData);
        done();
      });
  });

  it('getting a product that does not exist', () => {
    return request(app)
      .get('/products/891273QQ')
      .set('Authorization', `Bearer ${token}`)
      .expect(404);
  });

  it('getting all products', () => {
    return request(app).get('/products').expect(200);
  });

  it('updating a product', () => {
    return request(app).put('/products/SKDKFS1230').send(testData).expect(200);
  });

  it('updating a product with bad data', () => {
    return request(app).post('/products/SKDKFS1230').send(badData).expect(404);
  });

  it('updating a product with non matching product id', () => {
    return request(app).put('/products/891273QQ').send(testData).expect(404);
  });

  it('deleting a product', () => {
    return request(app).delete('/products/SKDKFS1230').expect(200);
  });
});
