const mongoose = require("mongoose");
const express = require("express");
const Product = require("./models/Product");
const cors = require("cors");
const app = express();
app.use(cors());
mongoose
  .connect("mongodb://127.0.0.1:27017/mernTaskDB")
  .then(() => {
    console.log("MongoDB Connected Successfully!");
  })
  .catch((err) => {
    console.log(err);
  });
const PORT = 5000;
const products = [
  {
    id: 1,
    name: "Laptop",
    price: 50000,
  },
  {
    id: 2,
    name: "Phone",
    price: 25000,
  },
  {
    id: 3,
    name: "Headphones",
    price: 3000,
  },
];

// Home Route
app.get("/", (req, res) => {
  res.send("Welcome to Product API");
});

app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error fetching products");
  }
});
app.get("/add-product", async (req, res) => {
  try {
    const product = new Product({
      name: "Laptop",
      price: 50000,
    });

    const savedProduct = await product.save();

    console.log(savedProduct);

    res.send("Product Saved Successfully!");
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
});
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});