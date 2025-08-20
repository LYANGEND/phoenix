const Application = require('../models/Application');

exports.submitApplication = async (req, res) => {
  try {
    const application = await Application.create(req.body);
    res.status(201).json(application);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
// Get all applications
exports.getAllApplications = async (req, res) => {
  try {
    const applications = await Application.find();
    res.json(applications);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
// Update application status
exports.updateApplicationStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const application = await Application.findById(req.params.id);
    if (!application) return res.status(404).json({ message: 'Application not found' });
    application.status = status;
    const updated = await application.save();
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
