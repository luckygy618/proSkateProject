const debug = require('debug')('api:test:account:password');
const { validateUpdatePassword } = require('../../controllers/account/authentication');
var invalid_data = [
  {
    sdf: 'tes',
    newPassword: 'asdfg123123',
    confirmNewPassword: 'asdfg123123',
  },
  {
    currentPassword: 'tes',
    newPassword: 'asdfg123123',
    confirmNewPassword: 'asdfg123123',
  },
  {
    currentPassword: 'test1234',
    newPassword: 'asd',
    confirmNewPassword: 'asdfg123123',
  },
  {
    currentPassword: 'test1234',
    newPassword: '***********',
    confirmNewPassword: '***********',
  },
  {
    currentPassword: '..?~1asd',
    newPassword: 'asdfg123123',
    confirmNewPassword: 'asdfg123123',
  },
];

var valid_data = [
  {
    currentPassword: 'test1234',
    newPassword: 'asdfg123123',
    confirmNewPassword: 'asdfg123123',
  },
  {
    currentPassword: 'asdfg123123',
    newPassword: 'test1234',
    confirmNewPassword: 'test1234',
  },
  {
    currentPassword: 'test123456',
    newPassword: 'asdfg1asd123',
    confirmNewPassword: 'asdfg1asd123',
  },
  {
    currentPassword: 'test123456',
    newPassword: '12345asdfg',
    confirmNewPassword: '12345asdfg',
  },
];

describe('tests for validating updatedPassword function', () => {
  for (let i = 0; i < valid_data.length; i++) {
    it('should succeed for valid password change requests', async () => {
      await expect(validateUpdatePassword(valid_data[i])).resolves.toBeTruthy();
    });
  }

  for (let i = 0; i < invalid_data.length; i++) {
    it('should fail for invalid password change requests', async () => {
      await expect(validateUpdatePassword(invalid_data[i])).rejects.toThrow();
    });
  }
});
