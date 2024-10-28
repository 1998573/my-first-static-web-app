const winston = require('winston');

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: [
        new winston.transports.File({ filename: 'logs/app.log' })
    ]
});

function logInfo(message) {
    logger.info(message);
}

function logError(message, error) {
    logger.error(`${message} - ${error.message}`);
}

module.exports = { logInfo, logError };
