const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());

/** Do not change the connection string below */
mongoose.connect("mongodb://localhost:27017/myApp", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
/** connection ends */

const productSchema = mongoose.Schema({
  name: { type: String, required: true },
  brand: { type: String },
  price: { type: Number, min: 0 },
  specs: { type: Object },
});

const Product = mongoose.model("product", productSchema);

app.get("/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.post("/products", async (req, res) => {
  try {
    const product = new Product(req.body);
    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = { app, Product };
