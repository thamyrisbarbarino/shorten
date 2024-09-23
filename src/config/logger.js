// logger.js
import winston from 'winston';

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'combined.log' }),
        new winston.transports.Http({
            host: 'localhost', // ou o endereço do seu ES
            port: 9200,
            path: '/_bulk',
            ssl: false,
        }),
    ],
});

export default logger;
