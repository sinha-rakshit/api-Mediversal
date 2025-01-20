const zod = require('zod');
const logger = require('../config/logger');

const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;

const appointmentSchema = zod.object({
  date: zod.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format'),
  time: zod.string().regex(timeRegex, 'Time must be in HH:mm format'),
  description: zod.string().max(500, 'Description must be 500 characters or less').min(1, 'Description is required')
});

const validateAppointment = function (req, res, next) {
  try {
    appointmentSchema.parse(req.body);
    next(); 
  } catch (error) {
    logger.error('Validation error', { error: error.errors });
    return res.status(400).json({
      error: 'Validation failed',
      details: error.errors.map(err => err.message),
    });
  }
};

module.exports = { validateAppointment };
