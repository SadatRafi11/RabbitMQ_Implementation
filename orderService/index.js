const express = require("express");
const connectDB = require("./config/dbConnect");
const Order = require("./models/orderService");
const OrderStatus = require("./models/orderStatus");
const producerConnect = require("./producerConnect");
const app = express();
require("dotenv").config();

app.use(express.json({ extende: false }));
connectDB();

let channel;
(async () => {
  channel = await producerConnect();
  console.log("Connected to RabbitMQ...");
})();

app.post("/order/:restaurantName", async (req, res) => {
  let { name, availableQty, price, productId } = req.body;
  let order = new Order({
    name,
    availableQty,
    price,
  });
  await order.save();
  console.log(order);
  const message = `Order Successfully Placed to ${req.params.restaurantName}`;
  let orderStatus = new OrderStatus({
    order: order._id,
    status: "PROCESS",
    message,
    product: productId,
  });
  await orderStatus.save();
  orderStatus = await orderStatus.populate({
    path: "order",
    select: "availableQty",
  });
  console.log(orderStatus);
  if (channel) {
    channel.sendToQueue(
      process.env.QUEUE_NAME,
      Buffer.from(JSON.stringify(orderStatus))
    );
  }
  res.json(orderStatus);
});

app.listen(process.env.PORT, () => {
  console.log("Order Service running on port : " + process.env.PORT);
});
