const amqp = require('amqplib');

async function sendMessage(queue, message) {
    const connection = await amqp.connect(process.env.MESSAGE_QUEUE_URL);
    const channel = await connection.createChannel();
    await channel.assertQueue(queue);
    channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)));
    console.log(`Message sent to queue ${queue}`);
}

module.exports = { sendMessage };
