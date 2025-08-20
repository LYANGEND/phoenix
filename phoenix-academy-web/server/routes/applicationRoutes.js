const express = require('express');
const router = express.Router();
const { submitApplication, getAllApplications, updateApplicationStatus } = require('../controllers/applicationController');

router.post('/', submitApplication);
router.get('/', getAllApplications);
router.put('/:id/status', updateApplicationStatus);

module.exports = router;
