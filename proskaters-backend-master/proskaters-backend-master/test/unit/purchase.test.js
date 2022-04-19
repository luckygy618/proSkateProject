const debug = require('debug')('api:test:product:purchase');
const { validatePurchase } = require('../../controllers/purchase');

describe('purchase validation tests', () => {
  let goodData = [
    {
      items: [
        {
          product_id: 'SKDKFS1230',
          quantity: 12,
          lineTotal: 34.99,
        },
        {
          product_id: 'UVK23354',
          quantity: 12,
          lineTotal: 34.99,
        },
      ],
      totalQuantity: 24,
      subtotal: 12.88,
    },
  ];

  let badData = [
    {
      subtotal: 12.88,
    },
    {
      items: [
        {
          product_id: 'SKDKFS1230',
          quantity: 12,
          lineTotal: 34.99,
        },
        {
          product_id: 'SKDKFS1230',
          quantity: 12,
          lineTotal: 34.99,
        },
      ],
    },
    {
      items: {
        product_id: 'SKDKFS1230',
        quantity: 12,
        lineTotal: 34.99,
      },
      subtotal: 12.88,
    },
    {
      items: [
        {
          product_id: 'SKDKFS1230',
          quantity: 12,
          lineTotal: 34.99,
        },
        {
          product_id: '',
          quantity: 12,
          lineTotal: 34.99,
        },
      ],
      subtotal: 12.88,
    },
    {
      items: [
        {
          product_id: 'SKDKFS1230',
          quantity: 'asdfsa',
          lineTotal: 34.99,
        },
        {
          product_id: 'SKDKFS1230',
          quantity: 12,
          lineTotal: 34.99,
        },
      ],
      subtotal: 12.88,
    },
    {
      items: [
        {
          product_id: 'SKDKFS1230',
          quantity: 12,
          lineTotal: 'adfadfs',
        },
        {
          product_id: 'SKDKFS1230',
          quantity: 12,
          lineTotal: 34.99,
        },
      ],
      subtotal: 12.88,
    },
    {
      items: [
        {
          product_id: 'SKDKFS1230',
          quantity: 12,
          lineTotal: 34.99,
        },
        {
          product_id: 'SKDKFS1230',
          quantity: 12,
          lineTotal: 34.99,
        },
      ],
      subtotal: 'sdfsd',
    },
  ];

  for (let i = 0; i < goodData.length; i++) {
    it('should be good for proper data', async () => {
      await expect(validatePurchase(goodData[i])).resolves.toBeTruthy();
    });
  }

  for (let i = 0; i < badData.length; i++) {
    it('should throw for bad data', async () => {
      await expect(validatePurchase(badData[i])).rejects.toThrow();
    });
  }
});
