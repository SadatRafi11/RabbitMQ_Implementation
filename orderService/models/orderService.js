const mongoose = require("mongoose");

const OrdersSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  availableQty: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

module.exports = Orders = mongoose.model("orders", OrdersSchema);
