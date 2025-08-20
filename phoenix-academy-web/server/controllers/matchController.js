const Match = require('../models/Match');

// Get all upcoming matches
const getUpcomingMatches = async (req, res) => {
  try {
    const currentDate = new Date();
    const matches = await Match.find({ matchDate: { $gte: currentDate } })
      .populate('teamA', 'name ageGroup gender')
      .populate('starting11', 'firstName lastName position')
      .populate('substitutes', 'firstName lastName position')
      .sort({ matchDate: 1 });
    
    res.status(200).json({
      success: true,
      data: matches,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching matches',
      error: error.message,
    });
  }
};

// Get all matches (including past ones)
const getAllMatches = async (req, res) => {
  try {
    const matches = await Match.find()
      .populate('teamA', 'name ageGroup gender')
      .populate('starting11', 'firstName lastName position')
      .populate('substitutes', 'firstName lastName position')
      .sort({ matchDate: -1 });
    
    res.status(200).json({
      success: true,
      data: matches,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching matches',
      error: error.message,
    });
  }
};

// Get match by ID
const getMatchById = async (req, res) => {
  try {
    const { id } = req.params;
    const match = await Match.findById(id)
      .populate('teamA', 'name ageGroup gender')
      .populate('starting11', 'firstName lastName position')
      .populate('substitutes', 'firstName lastName position');
    
    if (!match) {
      return res.status(404).json({
        success: false,
        message: 'Match not found',
      });
    }

    res.status(200).json({
      success: true,
      data: match,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching match',
      error: error.message,
    });
  }
};

// Create new match (for admin)
const createMatch = async (req, res) => {
  try {
    const match = new Match(req.body);
    const savedMatch = await match.save();
    
    res.status(201).json({
      success: true,
      message: 'Match created successfully',
      data: savedMatch,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error creating match',
      error: error.message,
    });
  }
};

// Update match (for admin)
const updateMatch = async (req, res) => {
  try {
    const { id } = req.params;
    const match = await Match.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!match) {
      return res.status(404).json({
        success: false,
        message: 'Match not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Match updated successfully',
      data: match,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error updating match',
      error: error.message,
    });
  }
};

// Update match starting 11 and substitutes (for admin)
const updateMatchLineup = async (req, res) => {
  try {
    const { id } = req.params;
    const { starting11, substitutes } = req.body;
    
    const match = await Match.findByIdAndUpdate(
      id,
      { starting11, substitutes },
      { new: true, runValidators: true }
    ).populate('starting11', 'firstName lastName position')
     .populate('substitutes', 'firstName lastName position');

    if (!match) {
      return res.status(404).json({
        success: false,
        message: 'Match not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Match lineup updated successfully',
      data: match,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error updating match lineup',
      error: error.message,
    });
  }
};

module.exports = {
  getUpcomingMatches,
  getAllMatches,
  getMatchById,
  createMatch,
  updateMatch,
  updateMatchLineup,
};