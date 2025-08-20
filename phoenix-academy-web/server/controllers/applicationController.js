const Application = require('../models/Application');

// Submit a new application
const submitApplication = async (req, res) => {
  try {
    const application = new Application(req.body);
    const savedApplication = await application.save();
    res.status(201).json({
      success: true,
      message: 'Application submitted successfully',
      data: savedApplication,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error submitting application',
      error: error.message,
    });
  }
};

// Get all applications (for admin)
const getAllApplications = async (req, res) => {
  try {
    const applications = await Application.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      data: applications,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching applications',
      error: error.message,
    });
  }
};

// Update application status (for admin)
const updateApplicationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const application = await Application.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    );

    if (!application) {
      return res.status(404).json({
        success: false,
        message: 'Application not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Application status updated successfully',
      data: application,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error updating application status',
      error: error.message,
    });
  }
};

module.exports = {
  submitApplication,
  getAllApplications,
  updateApplicationStatus,
};