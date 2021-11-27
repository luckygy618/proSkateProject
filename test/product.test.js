const debug = require("debug")("test:product");
const { validateProduct } = require("../controllers/product");

var testData = {
  product_id: "SKDKFS1230",
  product_name: "Shuang Jie Bang",
  image: "http://thisisalinktoanimage",
  price: 99.33,
  stock_amount: 12314,
  sku: "what is this madness",
  brand: "gucci",
  intro: "a brief introduction",
  description:
    "this is a first line \n this is a second line \n this is third line",
  stock_status: "guess",
  rating: 4,
};

describe("product validation", () => {
  it("should be good for proper data", async () => {
    await expect(validateProduct(testData)).resolves.toBeTruthy();
  });
});
