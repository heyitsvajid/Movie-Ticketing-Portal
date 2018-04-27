const winston = require('winston');
const fs = require('fs');
const logDir = 'logging';

// Create the log directory if it does not exist
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
}

const timeFormat = () => (new Date()).toLocaleTimeString();

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
        new winston.transports.Console({
            timestamp: timeFormat,
            level: 'info',
            handleExceptions: true,
            json: false,
            colorize: true,
        }),
        new winston.transports.File({
            filename: `${logDir}/useranalytics.log`,
            timestamp: timeFormat,
            json: true,
            level: 'info'
        })
    ],
    exceptionHandlers: [
        new winston.transports.File({
            filename: `${logDir}/errors.log`,
        })
    ]
});

module.exports = logger;