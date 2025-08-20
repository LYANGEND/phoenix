const express = require('express');
const router = express.Router();
const {
  submitApplication,
  getAllApplications,
  updateApplicationStatus,
} = require('../controllers/applicationController');
const { verifyToken } = require('../controllers/authController');

// Public route - submit application
router.post('/', submitApplication);

// Protected admin routes
router.get('/', verifyToken, getAllApplications);
router.put('/:id/status', verifyToken, updateApplicationStatus);

module.exports = router;