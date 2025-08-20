const express = require('express');
const router = express.Router();
const { getActivePlayers, getPlayerById, createPlayer, updatePlayer, deletePlayer } = require('../controllers/playerController');

router.get('/', getActivePlayers);
router.get('/:id', getPlayerById);
router.post('/', createPlayer);
router.put('/:id', updatePlayer);
router.delete('/:id', deletePlayer);

module.exports = router;
