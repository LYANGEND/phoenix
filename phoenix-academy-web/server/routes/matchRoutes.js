const express = require('express');
const router = express.Router();
const {
  getUpcomingMatches,
  getAllMatches,
  getMatchById,
  createMatch,
  updateMatch,
  updateMatchLineup,
} = require('../controllers/matchController');
const { verifyToken } = require('../controllers/authController');

// Public routes
router.get('/', getUpcomingMatches);
router.get('/all', getAllMatches);
router.get('/:id', getMatchById);

// Protected admin routes
router.post('/', verifyToken, createMatch);
router.put('/:id', verifyToken, updateMatch);
router.put('/:id/lineup', verifyToken, updateMatchLineup);

module.exports = router;