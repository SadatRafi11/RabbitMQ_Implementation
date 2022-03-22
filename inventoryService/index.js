require("dotenv").config();
const express = require("express");
const connectDB = require("./config/dbConnect");
const listener = require("./listener");
const Product = require("./models/Product");
const app = express();

app.use(express.json({ extende: false }));

connectDB();
listener();

app.post("/", async (req, res) => {
  let { name, availableQty, price } = req.body;
  let product = new Product({
    name,
    availableQty,
    price,
  });
  await product.save();
  res.json(product);
});

app.listen(process.env.PORT, () => {
  console.log("Inventory Service is running on port: " + process.env.PORT);
});
