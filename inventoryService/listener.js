const consumerConnect = require("./consumerConnect");
const Product = require("./models/Product");

const listener = async () => {
  const channel = await consumerConnect();
  console.log("Connected to RabbitMQ...");

  channel.consume(process.env.QUEUE_NAME, async (message) => {
    let orderStatus = JSON.parse(message.content.toString());
    console.log(orderStatus);
    channel.ack(message);
    let product = await Product.findById(orderStatus.product);
    if (!product) {
      console.log("Product Id Not available");
    } else {
      if (orderStatus.order.qty <= product.availableQty) {
        console.log("Quantitity Avaliable");
      } else {
        console.log("Quantity Not Available");
      }
    }
  });
};

module.exports = listener;
