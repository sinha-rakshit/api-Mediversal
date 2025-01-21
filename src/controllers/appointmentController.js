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
            error: 'Appointment time slot is not available.',
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
  getAppointmentById: async (req, res) => {
    try {
      logger.info('Retrieving appointment by ID', { appointmentId: req.params.id });
      const appointment = await Appointment.findById(req.params.id);
      if (!appointment) {
        logger.warn('Appointment not found', { appointmentId: req.params.id });
        return res.status(404).json({ error: 'Appointment not found' });
      }
      res.json(appointment);
    } catch (error) {
      logger.error('Failed to retrieve appointment:', error);
      res.status(500).json({ error: 'Failed to retrieve appointment' });
    }
  },
  updateAppointment: async (req, res) => {
    try {
      const { date, time, description } = req.body;

      logger.info('Updating appointment', { 
        appointmentId: req.params.id,
        updates: { date, time }
      });

      const [hours, minutes] = time.split(':');
      const appointmentStart = new Date(date);
      appointmentStart.setHours(parseInt(hours), parseInt(minutes), 0, 0);
  
      const appointmentEnd = new Date(appointmentStart);
      appointmentEnd.setMinutes(appointmentEnd.getMinutes() + BUFFER_MINUTES);
  
      const overlappingAppointment = await Appointment.findOne({
        _id: { $ne: req.params.id }, 
        $expr: {
          $and: [
            { $lt: ["$date", appointmentEnd] }, 
            { $gte: ["$date", appointmentStart] }, 
          ],
        },
      });
  
      if (overlappingAppointment) {
        logger.warn('Appointment overlap detected during update', {
          appointmentId: req.params.id,
          requestedDate: date,
          requestedTime: time,
          existingAppointment: overlappingAppointment
        });
        return res.status(409).json({
          error: 'Appointment time slot is not available.',
        });
      }
  
      const appointment = await Appointment.findByIdAndUpdate(
        req.params.id,
        {
          date: appointmentStart, 
          time,
          description,
        },
        { new: true } 
      );
  
      if (!appointment) {
        logger.warn('Appointment not found', { appointmentId: req.params.id });
        return res.status(404).json({ error: 'Appointment not found' });
      }

      logger.info('Appointment updated successfully', { appointmentId: appointment._id });
      res.json(appointment);
    } catch (error) {
      logger.error('Failed to update appointment:', error);
      res.status(500).json({ error: 'Failed to update appointment' });
    }
  },
  deleteAppointment: async (req, res) => {
    try {
      logger.info('Deleting appointment', { appointmentId: req.params.id });
      const appointment = await Appointment.findByIdAndDelete(req.params.id);
      if (!appointment) {
        logger.warn('Appointment not found for deletion', { appointmentId: req.params.id });
        return res.status(404).json({ error: 'Appointment not found' });
      }
      logger.info('Appointment deleted successfully', { appointmentId: req.params.id });
      res.status(204).send();
    } catch (error) {
      logger.error('Failed to delete appointment:', error);
      res.status(500).json({ error: 'Failed to delete appointment' });
    }
  }
}

module.exports = appointmentController;