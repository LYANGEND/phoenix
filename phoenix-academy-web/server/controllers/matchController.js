const Match = require('../models/Match');

exports.getUpcomingMatches = async (req, res) => {
  try {
    const matches = await Match.find({ matchDate: { $gte: new Date() } }).sort('matchDate');
    res.json(matches);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
// Get single match by ID
exports.getMatchById = async (req, res) => {
  try {
    const match = await Match.findById(req.params.id)
      .populate('teamA')
      .populate('starting11')
      .populate('substitutes');
    if (!match) return res.status(404).json({ message: 'Match not found' });
    res.json(match);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a new match
exports.createMatch = async (req, res) => {
  try {
    const match = await Match.create(req.body);
    res.status(201).json(match);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update existing match
exports.updateMatch = async (req, res) => {
  try {
    const match = await Match.findByIdAndUpdate(req.params.id, req.body, { new: true })
      .populate('teamA')
      .populate('starting11')
      .populate('substitutes');
    if (!match) return res.status(404).json({ message: 'Match not found' });
    res.json(match);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete a match
exports.deleteMatch = async (req, res) => {
  try {
    const match = await Match.findByIdAndDelete(req.params.id);
    if (!match) return res.status(404).json({ message: 'Match not found' });
    res.json({ message: 'Match deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
