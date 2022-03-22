const mongoose = require("mongoose");

const OrderStatusSchema = new mongoose.Schema({
  order: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "orders",
  },
  status: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "orders",
  },
});

module.exports = OrderStatus = mongoose.model("orderStatus", OrderStatusSchema);
