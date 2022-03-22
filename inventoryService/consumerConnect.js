const consumerConnect = async () => {
  const rabbit = require("amqplib");
  const connection = await rabbit.connect("amqp://localhost");
  const channel = await connection.createChannel();
  return channel;
};

module.exports = consumerConnect;
