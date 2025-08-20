const Player = require('../models/Player');

exports.getActivePlayers = async (req, res) => {
  try {
    const players = await Player.find({ isActive: true });
    res.json(players);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getPlayerById = async (req, res) => {
  try {
    const player = await Player.findById(req.params.id);
    if (!player) return res.status(404).json({ message: 'Player not found' });
    res.json(player);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
