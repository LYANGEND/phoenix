const express = require('express');
const router = express.Router();
const { 
  getActivePlayers, 
  getPlayerById, 
  createPlayer, 
  updatePlayer, 
  deletePlayer 
} = require('../controllers/playerController');

// GET /api/players - Get all active players
router.get('/', getActivePlayers);

// GET /api/players/:id - Get player by ID
router.get('/:id', getPlayerById);

// POST /api/players - Create new player
router.post('/', createPlayer);

// PUT /api/players/:id - Update player
router.put('/:id', updatePlayer);

// DELETE /api/players/:id - Delete player (soft delete)
router.delete('/:id', deletePlayer);

module.exports = router;