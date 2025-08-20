const mongoose = require('mongoose');
const { Schema } = mongoose;

const matchSchema = new Schema({
  teamA: { type: Schema.Types.ObjectId, ref: 'Team', required: true },
  teamB: { type: String, required: true, trim: true },
  scoreA: { type: Number, default: 0 },
  scoreB: { type: Number, default: 0 },
  matchDate: { type: Date, required: true },
  venue: { type: String, required: true, trim: true },
  starting11: [{ type: Schema.Types.ObjectId, ref: 'Player' }],
  substitutes: [{ type: Schema.Types.ObjectId, ref: 'Player' }],
}, { timestamps: true });

module.exports = mongoose.model('Match', matchSchema);
