const express = require('express');
const router = express.Router();
const { 
  submitApplication, 
  getAllApplications, 
  getApplicationById, 
  updateApplicationStatus, 
  getApplicationsByStatus 
} = require('../controllers/applicationController');

// POST /api/applications - Submit new application
router.post('/', submitApplication);

// GET /api/applications - Get all applications
router.get('/', getAllApplications);

// GET /api/applications/status/:status - Get applications by status
router.get('/status/:status', getApplicationsByStatus);

// GET /api/applications/:id - Get application by ID
router.get('/:id', getApplicationById);

// PUT /api/applications/:id/status - Update application status
router.put('/:id/status', updateApplicationStatus);

module.exports = router;
