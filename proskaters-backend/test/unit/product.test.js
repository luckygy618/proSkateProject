const debug = require('debug')('api:test:product');
const { validateProduct } = require('../../controllers/product');

var testData = [
  {
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
  },
  {
    product_id: 9,
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
  },
  {
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
  },
  {
    product_id: null,
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
  },
  {
    product_id: 'SKDKFS1230',
    product_name: 123,
    image: 'image.jpg',
    price: 99.33,
    stock_amount: 12314,
    sku: 'what is this madness',
    brand: 'gucci',
    intro: 'a brief introduction',
    description: 'this is a first line \n this is a second line \n this is third line',
    stock_status: 'guess',
    rating: 4,
  },
  {
    product_id: 'SKDKFS1230',
    product_name: '',
    image: 'image.jpg',
    price: 99.33,
    stock_amount: 12314,
    sku: 'what is this madness',
    brand: 'gucci',
    intro: 'a brief introduction',
    description: 'this is a first line \n this is a second line \n this is third line',
    stock_status: 'guess',
    rating: 4,
  },
  {
    product_id: 'SKDKFS1230',
    product_name: null,
    image: 'image.jpg',
    price: 99.33,
    stock_amount: 12314,
    sku: 'what is this madness',
    brand: 'gucci',
    intro: 'a brief introduction',
    description: 'this is a first line \n this is a second line \n this is third line',
    stock_status: 'guess',
    rating: 4,
  },
  {
    product_id: 'SKDKFS1230',
    product_name: 'Shuang Jie Bang',
    image: 4543,
    price: 99.33,
    stock_amount: 12314,
    sku: 'what is this madness',
    brand: 'gucci',
    intro: 'a brief introduction',
    description: 'this is a first line \n this is a second line \n this is third line',
    stock_status: 'guess',
    rating: 4,
  },
  {
    product_id: 'SKDKFS1230',
    product_name: 'Shuang Jie Bang',
    image: '',
    price: 99.33,
    stock_amount: 12314,
    sku: 'what is this madness',
    brand: 'gucci',
    intro: 'a brief introduction',
    description: 'this is a first line \n this is a second line \n this is third line',
    stock_status: 'guess',
    rating: 4,
  },
  {
    product_id: 'SKDKFS1230',
    product_name: 'Shuang Jie Bang',
    image: null,
    price: 99.33,
    stock_amount: 12314,
    sku: 'what is this madness',
    brand: 'gucci',
    intro: 'a brief introduction',
    description: 'this is a first line \n this is a second line \n this is third line',
    stock_status: 'guess',
    rating: 4,
  },
];

describe('product validation tests', () => {
  it('should be good for proper data', async () => {
    await expect(validateProduct(testData[0])).resolves.toBeTruthy();
  });
  it('should be bad for product_id being invalid data type', async () => {
    await expect(validateProduct(testData[1])).rejects.toThrow();
  });
  it('should be bad for empty product_id', async () => {
    await expect(validateProduct(testData[2])).rejects.toThrow();
  });
  it('should be bad for null product_id', async () => {
    await expect(validateProduct(testData[3])).rejects.toThrow();
  });
  it('should be bad for product_name being invalid data type', async () => {
    await expect(validateProduct(testData[4])).rejects.toThrow();
  });
  it('should be bad for empty product_name', async () => {
    await expect(validateProduct(testData[5])).rejects.toThrow();
  });
  it('should be bad for null product_name', async () => {
    await expect(validateProduct(testData[6])).rejects.toThrow();
  });
  it('should be bad for image being invalid data type', async () => {
    await expect(validateProduct(testData[7])).rejects.toThrow();
  });
  it('should be bad for empty image', async () => {
    await expect(validateProduct(testData[8])).rejects.toThrow();
  });
  it('should be bad for null image', async () => {
    await expect(validateProduct(testData[9])).rejects.toThrow();
  });
});
