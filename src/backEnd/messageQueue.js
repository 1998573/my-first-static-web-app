const loggingService = require('./logging');

exports.sendMessage = (message) => {
    // 模拟消息队列发送
    loggingService.log(`Message sent to queue: ${JSON.stringify(message)}`);
    console.log("Message sent to queue", message);
};
