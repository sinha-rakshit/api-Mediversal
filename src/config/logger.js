const winston = require('winston');

const logFormat = winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD' }),
    winston.format.errors({ stack: true }),
    winston.format.splat(),
    winston.format.json() 
);

const logger = winston.createLogger({
    level: 'info',
    format: logFormat,
    transports: [
      new winston.transports.Console({
        format: winston.format.combine(
          winston.format.json()
        )
      }),
  
      new winston.transports.File({ filename : "src/logs/error.log", level : "error"}),
      new winston.transports.File({filename : "src/logs/combine.log"})
    ]
  });

  module.exports = logger;