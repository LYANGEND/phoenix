const Team = require('../models/Team');

// Get all teams
const getAllTeams = async (req, res) => {
  try {
    const teams = await Team.find().sort({ ageGroup: 1, gender: 1 });
    
    res.status(200).json({
      success: true,
      data: teams,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching teams',
      error: error.message,
    });
  }
};

// Get team by ID
const getTeamById = async (req, res) => {
  try {
    const { id } = req.params;
    const team = await Team.findById(id);
    
    if (!team) {
      return res.status(404).json({
        success: false,
        message: 'Team not found',
      });
    }

    res.status(200).json({
      success: true,
      data: team,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching team',
      error: error.message,
    });
  }
};

// Create new team (for admin)
const createTeam = async (req, res) => {
  try {
    const team = new Team(req.body);
    const savedTeam = await team.save();
    
    res.status(201).json({
      success: true,
      message: 'Team created successfully',
      data: savedTeam,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error creating team',
      error: error.message,
    });
  }
};

// Update team (for admin)
const updateTeam = async (req, res) => {
  try {
    const { id } = req.params;
    const team = await Team.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!team) {
      return res.status(404).json({
        success: false,
        message: 'Team not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Team updated successfully',
      data: team,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error updating team',
      error: error.message,
    });
  }
};

module.exports = {
  getAllTeams,
  getTeamById,
  createTeam,
  updateTeam,
};