const Appointment = require('../models/appointment');
const logger = require('../config/logger');

const BUFFER_MINUTES = 20; 

const appointmentController = {
  createAppointment: async function(req, res) {
    try {
      const { date, time, description } = req.body;

      logger.info('Creating new appointment', { date, time });

      const [hours, minutes] = time.split(':');
      const appointmentStart = new Date(date);
      appointmentStart.setHours(parseInt(hours), parseInt(minutes), 0, 0);

      const appointmentEnd = new Date(appointmentStart);
      appointmentEnd.setMinutes(appointmentEnd.getMinutes() + BUFFER_MINUTES);

      const overlappingAppointment = await Appointment.findOne({
        $expr: {
          $and: [
            { $lt: ["$date", appointmentEnd] }, 
            { $gte: ["$date", appointmentStart] }, 
          ],
        },
      });

      if (overlappingAppointment) {
        logger.warn('Appointment overlap detected', { 
          requestedDate: date,
          requestedTime: time,
          existingAppointment: overlappingAppointment
        });
        return res
          .status(409)
          .json({
            error: 'Appointment time slot is not available. Please allow a 20-minute buffer between appointments.',
          });
      }

      const appointment = new Appointment({
        date: appointmentStart, 
        time,
        description,
      });

      await appointment.save();
      logger.info('Appointment created successfully', { appointmentId: appointment._id });  
      res.status(201).json(appointment);
    } catch (error) {
      logger.error('Failed to create appointment:', error);
      res.status(500).json({ error: 'Failed to create appointment' });
    }
  },
  getAppointments: async function(req, res) {
    try {
      logger.info('Retrieving all appointments');
      const appointments = await Appointment.find().sort({ date: 1, time: 1 });
      res.json(appointments);
    } catch (error) {
      logger.error('Failed to retrieve appointments:', error);
      res.status(500).json({ error: 'Failed to retrieve appointments' });
    }
  },
}

module.exports = appointmentController;