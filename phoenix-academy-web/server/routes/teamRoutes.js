const express = require('express');
const router = express.Router();
const { 
  getAllTeams, 
  getTeamById, 
  createTeam, 
  updateTeam, 
  deleteTeam 
} = require('../controllers/teamController');

// GET /api/teams - Get all teams
router.get('/', getAllTeams);

// GET /api/teams/:id - Get team by ID
router.get('/:id', getTeamById);

// POST /api/teams - Create new team
router.post('/', createTeam);

// PUT /api/teams/:id - Update team
router.put('/:id', updateTeam);

// DELETE /api/teams/:id - Delete team
router.delete('/:id', deleteTeam);

module.exports = router;