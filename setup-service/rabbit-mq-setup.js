const amqp = require('amqplib');

// RabbitMQ connection string
const messageQueueConnectionString = `amqp://${process.env.RABBITMQ || 'localhost'}`;

async function setup() {
  console.log('Setting up RabbitMQ Exchanges/Queues');
  // connect to RabbitMQ Instance
  console.log(messageQueueConnectionString);
  let connection = await amqp.connect(messageQueueConnectionString);

  // create a channel
  let channel = await connection.createChannel();

  // create exchange
  await channel.assertExchange('processing', 'direct', { durable: true });

  // create queues
  await channel.assertQueue('processing.requests', { durable: true });
  await channel.assertQueue('processing.results', { durable: true });

  // bind queues
  await channel.bindQueue('processing.requests', 'processing', 'request');
  await channel.bindQueue('processing.results', 'processing', 'result');

  console.log('Setup DONE');
  process.exit();
}

setup();
