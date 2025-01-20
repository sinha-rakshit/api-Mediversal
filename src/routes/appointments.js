const express = require('express');
const router = express.Router();
const { validateAppointment } = require('../middleware/validation');
const appointmentController = require('../controllers/appointmentController');

router.post('/', validateAppointment, appointmentController.createAppointment);

module.exports = router;