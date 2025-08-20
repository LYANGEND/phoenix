const Match = require('../models/Match');

// Get upcoming matches
exports.getUpcomingMatches = async (req, res) => {
  try {
    const matches = await Match.find({ matchDate: { $gte: new Date() } })
      .sort('matchDate')
      .populate('teamA')
      .populate('starting11')
      .populate('substitutes');
    res.json(matches);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all matches
exports.getAllMatches = async (req, res) => {
  try {
    const matches = await Match.find()
      .sort('-matchDate')
      .populate('teamA')
      .populate('starting11')
      .populate('substitutes');
    res.json(matches);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get match by ID
exports.getMatchById = async (req, res) => {
  try {
    const match = await Match.findById(req.params.id)
      .populate('teamA')
      .populate('starting11')
      .populate('substitutes');
    
    if (!match) {
      return res.status(404).json({ message: 'Match not found' });
    }
    
    res.json(match);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a new match
exports.createMatch = async (req, res) => {
  try {
    const match = await Match.create(req.body);
    const populatedMatch = await Match.findById(match._id)
      .populate('teamA')
      .populate('starting11')
      .populate('substitutes');
    res.status(201).json(populatedMatch);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update match
exports.updateMatch = async (req, res) => {
  try {
    const match = await Match.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )
      .populate('teamA')
      .populate('starting11')
      .populate('substitutes');
    
    if (!match) {
      return res.status(404).json({ message: 'Match not found' });
    }
    
    res.json(match);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update starting 11 and substitutes
exports.updateLineup = async (req, res) => {
  try {
    const { starting11, substitutes } = req.body;
    
    const match = await Match.findByIdAndUpdate(
      req.params.id,
      { starting11, substitutes },
      { new: true, runValidators: true }
    )
      .populate('teamA')
      .populate('starting11')
      .populate('substitutes');
    
    if (!match) {
      return res.status(404).json({ message: 'Match not found' });
    }
    
    res.json(match);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete match
exports.deleteMatch = async (req, res) => {
  try {
    const match = await Match.findByIdAndDelete(req.params.id);
    
    if (!match) {
      return res.status(404).json({ message: 'Match not found' });
    }
    
    res.json({ message: 'Match deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
