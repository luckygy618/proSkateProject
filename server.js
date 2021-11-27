require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");
const app = express();
const HTTP_PORT = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(cors());

const products = require("./controllers/product");

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/index.html"));
});

// Get all products
app.get("/products", (req, res) => {
  console.log("retrieving all products");
  products
    .getAllProducts()
    .then((data) => {
      res.json(data);
    })
    .catch((error) =>
      res.status(404).json({
        message: error,
      })
    );
});


app.post("/products/add", async (req, res) => {
  /*
  var rawdata = {
    product_id: "Testdata",
    product_name: "Flying 666",
    image: "https://",
    price: 59.97,
    stock_amount: 10,
    sku: "FE-A-MOVE",
    brand: "Flying Eagle",
    intro: "The favourite.",
    description: "Colours: Blue",
    stock_status: "In Stock",
    rating: 5
  };
*/
  products.addProduct(rawdata)
    .then((result) => {
      res.json(result);
    })
    .catch((error) =>
      res.status(404).json({
        message: error,
      })
    );
});

app.post("/products/update", async (req, res) => {
  /*
  var rawdata = {
    product_id: "Testdata",
    product_name: "updated 666",
    image: "updated://",
    price: 666.666,
    stock_amount: 6666.6666,
    sku: "updated",
    brand: "updated Eagle",
    intro: "updated favourite.",
    description: "updated: Blue",
    stock_status: "updated Stock",
    rating: 5
  };
*/

  products.updateProduct(rawdata)
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      res.status(404).json({
        message: error,
      })
    });
});



app.post("/products/delete", async (req, res) => {
  /*
  var rawdata = {
    product_id: "Testdata",
    product_name: "updated 666",
    image: "updated://",
    price: 666.666,
    stock_amount: 6666.6666,
    sku: "updated",
    brand: "updated Eagle",
    intro: "updated favourite.",
    description: "updated: Blue",
    stock_status: "updated Stock",
    rating: 5
  };
*/
  products.deleteProduct(rawdata)
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      res.status(404).json({
        message: error,
      })
    });
});



app.post("/products/find", async (req, res) => {
  /*
  var rawdata = {
    product_id: "Testdata",
    product_name: "updated 666",
    image: "updated://",
    price: 666.666,
    stock_amount: 6666.6666,
    sku: "updated",
    brand: "updated Eagle",
    intro: "updated favourite.",
    description: "updated: Blue",
    stock_status: "updated Stock",
    rating: 5
  };
*/
  products.findProduct(rawdata)
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      res.status(404).json({
        message: error,
      })
    });
});







app.use((req, res) => {
  res.status(404).send("Resource not found");
});

app.listen(HTTP_PORT, () => {
  console.log("Ready to handle requests on port " + HTTP_PORT);
});