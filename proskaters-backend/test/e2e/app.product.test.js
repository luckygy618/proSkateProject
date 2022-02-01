const debug = require('debug')('api:test:server');
const request = require('supertest');
const app = require('../../app');
const pool = require('../../database/pool');

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

beforeAll(async () => {
  try {
    const db = await pool.connect();
    let result = await db.query(`CREATE TABLE IF NOT EXISTS products (
    product_id varchar(10) PRIMARY KEY,
    product_name varchar(80) NOT NULL,
    image varchar(80) NOT NULL,
    price double precision NOT NULL,
    stock_amount int NOT NULL DEFAULT 0,
    sku varchar(20),
    brand varchar(30),
    intro text,
    description text,
    stock_status varchar(20),
    rating int NOT NULL DEFAULT 0
);`);
  } catch (err) {
    debug(err);
  }
});

afterAll(async () => {
  try {
    await pool.close();
  } catch (err) {
    debug(err);
  }
});

describe('api endpoint testing', () => {
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

  it('getting a product', (done) => {
    request(app)
      .get('/products/SKDKFS1230')
      .expect(200)
      .end((err, res) => {
        expect(res.body).toMatchObject(testData);
        done();
      });
  });

  it('getting a product that does not exist', () => {
    return request(app).get('/products/891273QQ').expect(404);
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
