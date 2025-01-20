const logger = require('../config/logger');

const errorHandler = function(err, req, res, next) {
  logger.error('Unhandled error:', {
    error: err.message,
    stack: err.stack,
    url: req.url,
    method: req.method,
    body: req.body
  });
  
    res.status(500).json({
      error: 'Internal Error!',
    });
  };
  
  module.exports = errorHandler;