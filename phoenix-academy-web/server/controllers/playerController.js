const Player = require('../models/Player');

// Get all active players
const getAllPlayers = async (req, res) => {
  try {
    const players = await Player.find({ isActive: true })
      .populate('team', 'name ageGroup gender')
      .sort({ lastName: 1 });
    
    res.status(200).json({
      success: true,
      data: players,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching players',
      error: error.message,
    });
  }
};

// Get player by ID
const getPlayerById = async (req, res) => {
  try {
    const { id } = req.params;
    const player = await Player.findById(id).populate('team', 'name ageGroup gender');
    
    if (!player) {
      return res.status(404).json({
        success: false,
        message: 'Player not found',
      });
    }

    res.status(200).json({
      success: true,
      data: player,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching player',
      error: error.message,
    });
  }
};

// Create new player (for admin)
const createPlayer = async (req, res) => {
  try {
    const player = new Player(req.body);
    const savedPlayer = await player.save();
    
    res.status(201).json({
      success: true,
      message: 'Player created successfully',
      data: savedPlayer,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error creating player',
      error: error.message,
    });
  }
};

// Update player (for admin)
const updatePlayer = async (req, res) => {
  try {
    const { id } = req.params;
    const player = await Player.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!player) {
      return res.status(404).json({
        success: false,
        message: 'Player not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Player updated successfully',
      data: player,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error updating player',
      error: error.message,
    });
  }
};

// Delete player (for admin)
const deletePlayer = async (req, res) => {
  try {
    const { id } = req.params;
    const player = await Player.findByIdAndUpdate(
      id,
      { isActive: false },
      { new: true }
    );

    if (!player) {
      return res.status(404).json({
        success: false,
        message: 'Player not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Player deactivated successfully',
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error deleting player',
      error: error.message,
    });
  }
};

module.exports = {
  getAllPlayers,
  getPlayerById,
  createPlayer,
  updatePlayer,
  deletePlayer,
};