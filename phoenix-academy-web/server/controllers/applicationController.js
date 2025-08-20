const Application = require('../models/Application');

// Submit a new application
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
    const applications = await Application.find().sort('-createdAt');
    res.json(applications);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get application by ID
exports.getApplicationById = async (req, res) => {
  try {
    const application = await Application.findById(req.params.id);
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }
    res.json(application);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update application status
exports.updateApplicationStatus = async (req, res) => {
  try {
    const { status } = req.body;
    
    if (!['Pending', 'Approved', 'Rejected'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }
    
    const application = await Application.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );
    
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }
    
    res.json(application);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get applications by status
exports.getApplicationsByStatus = async (req, res) => {
  try {
    const { status } = req.params;
    
    if (!['Pending', 'Approved', 'Rejected'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }
    
    const applications = await Application.find({ status }).sort('-createdAt');
    res.json(applications);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
