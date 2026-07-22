const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema(
  {
    jobId: {
      type: String,
      required: true
    },
    jobTitle: {
      type: String,
      required: true
    },
    department: {
      type: String,
      default: 'Engineering'
    },
    fullName: {
      type: String,
      required: [true, 'Please enter your full name'],
      trim: true
    },
    email: {
      type: String,
      required: [true, 'Please enter your email address'],
      trim: true,
      lowercase: true
    },
    portfolioUrl: {
      type: String,
      required: [true, 'Please enter your portfolio or GitHub URL'],
      trim: true
    },
    resumeUrl: {
      type: String,
      required: [true, 'Please enter your resume or CV link'],
      trim: true
    },
    coverNote: {
      type: String,
      default: ''
    },
    referenceId: {
      type: String,
      required: true,
      unique: true
    },
    status: {
      type: String,
      enum: ['pending', 'reviewed', 'shortlisted', 'rejected'],
      default: 'pending'
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Application', applicationSchema);
