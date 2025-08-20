const express = require('express');
const router = express.Router();
const { getUpcomingMatches, getMatchById, createMatch, updateMatch, deleteMatch } = require('../controllers/matchController');

router.get('/', getUpcomingMatches);
router.get('/:id', getMatchById);
router.post('/', createMatch);
router.put('/:id', updateMatch);
router.delete('/:id', deleteMatch);

module.exports = router;
