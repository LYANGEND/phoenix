const express = require('express');
const router = express.Router();
const {
  getAllTeams,
  getTeamById,
  createTeam,
  updateTeam,
} = require('../controllers/teamController');
const { verifyToken } = require('../controllers/authController');

// Public routes
router.get('/', getAllTeams);
router.get('/:id', getTeamById);

// Protected admin routes
router.post('/', verifyToken, createTeam);
router.put('/:id', verifyToken, updateTeam);

module.exports = router;