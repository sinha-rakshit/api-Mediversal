const express = require('express');
const router = express.Router();
const { validateAppointment } = require('../middleware/validation');
const appointmentController = require('../controllers/appointmentController');

router.post('/', validateAppointment, appointmentController.createAppointment);
router.get('/', appointmentController.getAppointments);
router.get('/:id', appointmentController.getAppointmentById);
router.put('/:id', validateAppointment, appointmentController.updateAppointment);
router.delete('/:id', appointmentController.deleteAppointment);

module.exports = router;