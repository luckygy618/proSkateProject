const debug = require('debug')('api:test:e2e:account:authentication');
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
  let token;
  let registerData = {
    email: 'herpdaderp@gmail.com',
    password: '1234Password',
    confirmPassword: '1234Password',
  };

  let badRegisterData = {
    email: 'herpdaderp@gmail.com',
    password: '1234Password',
    confirmPassword: '34DSFsdfsfc',
  };

  let loginData = {
    email: 'herpdaderp@gmail.com',
    password: '1234Password',
  };

  let badLoginData = {
    email: 'herpdaderp@gmail.com',
    password: '34DSFsdfsfc',
  };

  let updatePasswordData = {
    currentPassword: '1234Password',
    newPassword: 'asdfg123123',
    confirmNewPassword: 'asdfg123123',
  };

  let badUpdatePasswordData = {
    currentPassword: 'test1234',
    newPassword: 'asd',
    confirmNewPassword: 'asdfg123123',
  };

  it('visiting root', () => {
    return request(app).get('/').expect(200);
  });

  it('visiting undefined route', () => {
    return request(app).get('/undefined').expect(404);
  });

  it('visiting protected route', () => {
    return request(app).get('/protected').expect(403);
  });

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

  it('registering account with invalid credentials', () => {
    request(app).post('/account/register').send(badRegisterData).expect(404);
  });

  it('logging in with invalid credentials', () => {
    request(app).post('/account/login').send(badLoginData).expect(404);
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

  it('visiting protected route', () => {
    return request(app).get('/protected').set('Authorization', `Bearer ${token}`).expect(200);
  });

  it('should fail for trying to change password without valid token', () => {
    request(app).put('/account/password').send(updatePasswordData).expect(403);
  });

  it('should fail for invalid password change data', () => {
    request(app)
      .put('/account/password')
      .set('Authorization', `Bearer ${token}`)
      .send(badUpdatePasswordData)
      .expect(404);
  });

  it('should succeed for valid password change data', () => {
    request(app)
      .put('/account/password')
      .set('Authorization', `Bearer ${token}`)
      .send(updatePasswordData)
      .expect(200);
  });
});
