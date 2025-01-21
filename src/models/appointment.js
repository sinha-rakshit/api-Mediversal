const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true
  },
  time: {
    type: String,
    required: true,
    match: /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/ 
  },
  description: {
    type: String,
    maxLength: 500,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    immutable: true
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

appointmentSchema.pre('save', function (next) {
  const IST_OFFSET = 5.5 * 60 * 60 * 1000; 
  const now = new Date();
  this.updatedAt = new Date(now.getTime() + IST_OFFSET);
  next();
});

appointmentSchema.methods.toIST = function () {
  const IST_OFFSET = 5.5 * 60 * 60 * 1000; 
  const utcDate = new Date(this.date);
  const istDate = new Date(utcDate.getTime() + IST_OFFSET);
  return istDate;
};

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;