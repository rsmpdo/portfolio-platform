const mongoose = require('mongoose');

const PaymentRequestSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true
    },
    email: {
      type: String,
      required: true
    },
    plan: {
      type: String,
      enum: ['pro', 'studio'],
      required: true
    },
    amount: {
      type: Number,
      required: true
    },
    fullName: {
      type: String,
      required: true,
      trim: true
    },
    nationalIdNumber: {
      type: String,
      required: true,
      trim: true
    },
    country: {
      type: String,
      required: true,
      trim: true
    },
    phone: {
      type: String,
      required: true,
      trim: true
    },
    nationalIdUrl: {
      type: String,
      required: true
    },
    paymentSlipUrl: {
      type: String,
      required: true
    },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending',
      index: true
    },
    adminNote: {
      type: String,
      default: ''
    },
    reviewedAt: {
      type: Date
    },
    reviewedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  {
    timestamps: true
  }
);

PaymentRequestSchema.index({ status: 1, createdAt: -1 });

module.exports = mongoose.model('PaymentRequest', PaymentRequestSchema);
