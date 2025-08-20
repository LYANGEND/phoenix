const mongoose = require('mongoose');
const { Schema } = mongoose;

const teamSchema = new Schema({
  name: { type: String, required: true, trim: true },
  ageGroup: { type: String, required: true, trim: true },
  gender: { type: String, required: true, enum: ['Male', 'Female'], trim: true },
}, { timestamps: true });

module.exports = mongoose.model('Team', teamSchema);
