const Match = require('../models/Match');

exports.getUpcomingMatches = async (req, res) => {
  try {
    const matches = await Match.find({ matchDate: { $gte: new Date() } }).sort('matchDate');
    res.json(matches);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
