const producerConnect = async () => {
  const rabbit = require("amqplib");
  const EXCHANGE_TYPE = "direct";
  const EXCHANGE_NAME = "main";
  const KEY = "myKey";
  const connection = await rabbit.connect("amqp://localhost");
  const channel = await connection.createChannel();
  await channel.assertExchange(EXCHANGE_NAME, EXCHANGE_TYPE);
  await channel.assertQueue(process.env.QUEUE_NAME);
  channel.bindQueue(process.env.QUEUE_NAME, EXCHANGE_NAME, KEY);
  return channel;
};

module.exports = producerConnect;
