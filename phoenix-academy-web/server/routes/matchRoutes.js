const express = require('express');
const router = express.Router();
const { 
  getUpcomingMatches, 
  getAllMatches, 
  getMatchById, 
  createMatch, 
  updateMatch, 
  updateLineup, 
  deleteMatch 
} = require('../controllers/matchController');

// GET /api/matches/upcoming - Get upcoming matches
router.get('/upcoming', getUpcomingMatches);

// GET /api/matches - Get all matches
router.get('/', getAllMatches);

// GET /api/matches/:id - Get match by ID
router.get('/:id', getMatchById);

// POST /api/matches - Create new match
router.post('/', createMatch);

// PUT /api/matches/:id - Update match
router.put('/:id', updateMatch);

// PUT /api/matches/:id/lineup - Update starting 11 and substitutes
router.put('/:id/lineup', updateLineup);

// DELETE /api/matches/:id - Delete match
router.delete('/:id', deleteMatch);

module.exports = router;