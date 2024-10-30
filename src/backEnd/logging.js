const fs = require('fs');
const path = require('path');

exports.log = (message) => {
    const logPath = path.join(__dirname, '../logs/server.log');
    fs.appendFileSync(logPath, `[${new Date().toISOString()}] ${message}\n`);
};

exports.logError = (message, error) => {
    const logPath = path.join(__dirname, '../logs/error.log');
    fs.appendFileSync(logPath, `[${new Date().toISOString()}] ${message}: ${error.message}\n`);
};
