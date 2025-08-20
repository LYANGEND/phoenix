const Player = require('../models/Player');

// Get all active players
exports.getActivePlayers = async (req, res) => {
  try {
    const players = await Player.find({ isActive: true }).populate('team');
    res.json(players);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get player by ID
exports.getPlayerById = async (req, res) => {
  try {
    const player = await Player.findById(req.params.id).populate('team');
    if (!player) {
      return res.status(404).json({ message: 'Player not found' });
    }
    res.json(player);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a new player
exports.createPlayer = async (req, res) => {
  try {
    const player = await Player.create(req.body);
    const populatedPlayer = await Player.findById(player._id).populate('team');
    res.status(201).json(populatedPlayer);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update player
exports.updatePlayer = async (req, res) => {
  try {
    const player = await Player.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('team');
    
    if (!player) {
      return res.status(404).json({ message: 'Player not found' });
    }
    
    res.json(player);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete player (soft delete)
exports.deletePlayer = async (req, res) => {
  try {
    const player = await Player.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );
    
    if (!player) {
      return res.status(404).json({ message: 'Player not found' });
    }
    
    res.json({ message: 'Player deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
