const express = require('express');
const router = express.Router();
const {
  getAllPlayers,
  getPlayerById,
  createPlayer,
  updatePlayer,
  deletePlayer,
} = require('../controllers/playerController');
const { verifyToken } = require('../controllers/authController');

// Public routes
router.get('/', getAllPlayers);
router.get('/:id', getPlayerById);

// Protected admin routes
router.post('/', verifyToken, createPlayer);
router.put('/:id', verifyToken, updatePlayer);
router.delete('/:id', verifyToken, deletePlayer);

module.exports = router;