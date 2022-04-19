const debug = require('debug')('api:test:account:info');
const { validateInfo } = require('../../controllers/account/info');

let good_data = [
  {
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
  },
  {
    salutation: null,
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
  },
  {
    salutation: null,
    firstName: 'renaldo',
    lastName: 'Clown',
    phoneNumber: '426-820-5972',
    shippingAddress: {},
    billingAddress: {},
  },
];

let bad_data = [
  {
    salutation: null,
    firstName: 'renaldo',
    lastName: 'Clown',
    phoneNumber: '426-820-5972',
    shippingAddress: null,
    billingAddress: null,
  },
  {
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
  },
  {
    salutation: 'mr.',
    firstName: 'renaldo$$',
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
  },
  {
    salutation: 'mr.',
    firstName: 'renaldo',
    lastName: 'Clown ZZ#',
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
  },
  {
    salutation: 'mr.',
    firstName: 'renaldo',
    lastName: 'Clown',
    phoneNumber: '426-820ab5972',
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
  },
  {
    salutation: 'mr.',
    firstName: 'renaldo',
    lastName: 'Clown',
    phoneNumber: '426-820-5972',
    shippingAddress: {
      address1: 'Unit## 281, 1237 Apple Lane',
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
  },
  {
    salutation: 'mr.',
    firstName: 'renaldo',
    lastName: 'Clown',
    phoneNumber: '426-820-5972',
    shippingAddress: {
      address1: 'Unit 281, 1237 Apple Lane',
      city: 'TorontoQ1231ADSF',
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
  },
  {
    salutation: 'mr.',
    firstName: 'renaldo',
    lastName: 'Clown',
    phoneNumber: '426-820-5972',
    shippingAddress: {
      address1: 'Unit 281, 1237 Apple Lane',
      city: 'Toronto',
      province: 'ON123A',
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
  },
  {
    salutation: 'mr.',
    firstName: 'renaldo',
    lastName: 'Clown',
    phoneNumber: '426-820-5972',
    shippingAddress: {
      address1: 'Unit 281, 1237 Apple Lane',
      city: 'Toronto',
      province: 'ON',
      country: 'Canada12314151',
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
  },
  {
    salutation: 'mr.',
    firstName: 'renaldo',
    lastName: 'Clown',
    phoneNumber: '426-820-5972',
    shippingAddress: {
      address1: 'Unit 281, 1237 Apple Lane',
      city: 'Toronto',
      province: 'ON',
      country: 'Canada',
      postalCode: 'M2N 3L21231234',
    },
    billingAddress: {
      address1: '1237 Apple Lane',
      address1: 'Unit 281',
      city: 'Toronto',
      province: 'ON',
      country: 'Canada',
      postalCode: 'M2N 3L2',
    },
  },
];

describe('tests for validating input account info functions', () => {
  for (let i = 0; i < good_data.length; i++) {
    it('should succeed for good account information', async () => {
      await expect(validateInfo(good_data[i])).resolves.toBeTruthy();
    });
  }

  for (let i = 0; i < bad_data.length; i++) {
    it('should fail for bad account information', async () => {
      await expect(validateInfo(bad_data[i])).rejects.toThrow();
    });
  }
});
