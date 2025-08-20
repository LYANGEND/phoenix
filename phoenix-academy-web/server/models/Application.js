const mongoose = require('mongoose');
const { Schema } = mongoose;

const applicationSchema = new Schema({
  firstName: { type: String, required: true, trim: true },
  lastName: { type: String, required: true, trim: true },
  dateOfBirth: { type: Date, required: true },
  gender: { type: String, required: true, enum: ['Male', 'Female'] },
  parentName: { type: String, required: true, trim: true },
  parentPhone: { type: String, required: true, trim: true },
  parentEmail: { type: String, required: true, trim: true },
  previousClub: { type: String, default: '', trim: true },
  medicalInfo: { type: String, default: '', trim: true },
  status: {
    type: String,
    enum: ['Pending', 'Approved', 'Rejected'],
    default: 'Pending',
  },
}, { timestamps: true });

module.exports = mongoose.model('Application', applicationSchema);
