const debug = require('debug')('api:test:account:payment');
const { validatePayment } = require('../../controllers/account/payment');

let invalid_data = [
  {
    type: '',
    card: {
      number: '4242424242424242',
      exp_month: 2,
      exp_year: 2023,
      cvc: '314',
    },
  },
  {
    type: 'car',
    card: {
      number: '4242424242424242',
      exp_month: 2,
      exp_year: 2023,
      cvc: '314',
    },
  },
  {
    type: 'card',
    card: {
      number: 'abc',
      exp_month: 2,
      exp_year: 2023,
      cvc: '314',
    },
  },
  {
    type: 'card',
    card: {
      number: '424242424242424a',
      exp_month: 2,
      exp_year: 2023,
      cvc: '314',
    },
  },

  {
    type: 'card',
    card: {
      number: '4242426666666666',
      exp_month: 20,
      exp_year: 2023,
      cvc: '314',
    },
  },
  {
    type: 'card',
    card: {
      number: '4242426666666666',
      exp_month: 2,
      exp_year: 1023,
      cvc: '314',
    },
  },
  {
    type: 'card',
    card: {
      number: '4242426666666666',
      exp_month: 2,
      exp_year: 1023,
      cvc: 314,
    },
  },
  {
    type: 'card',
    card: {
      number: '4242426666666666',
      exp_month: 2,
      exp_year: 1023,
      cvc: 'abc',
    },
  },
];

let data = [
  {
    type: 'card',
    card: {
      number: '4242424242421231',
      exp_month: 2,
      exp_year: 2022,
      cvc: '314',
    },
  },
  {
    type: 'card',
    card: {
      number: '4242426666666666',
      exp_month: 3,
      exp_year: 2023,
      cvc: '314',
    },
  },
  {
    type: 'card',
    card: {
      number: '4242424242424241',
      exp_month: 4,
      exp_year: 2024,
      cvc: '314',
    },
  },
  {
    type: 'card',
    card: {
      number: '4242426666666667',
      exp_month: 5,
      exp_year: 2025,
      cvc: '314',
    },
  },
];

describe('tests for validatePayment functions', () => {
  for (let i = 0; i < invalid_data.length; i++) {
    it('should be bad for verifying invalid payment information', async () => {
      await expect(validatePayment(invalid_data[i])).rejects.toThrow();
    });
  }

  for (let i = 0; i < data.length; i++) {
    it('should be bad for verifying invalid payment information', async () => {
      await expect(validatePayment(data[i])).resolves.toBeTruthy();
    });
  }
});
