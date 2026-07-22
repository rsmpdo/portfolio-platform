const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema(
  {
    recipientUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null
    },
    recipientHandle: {
      type: String,
      default: ''
    },
    isSiteAdminMessage: {
      type: Boolean,
      default: false
    },
    senderName: {
      type: String,
      required: [true, 'Please enter your name'],
      trim: true
    },
    senderEmail: {
      type: String,
      required: [true, 'Please enter your email address'],
      trim: true,
      lowercase: true
    },
    subject: {
      type: String,
      default: 'New Inquiry'
    },
    message: {
      type: String,
      required: [true, 'Please enter your message'],
      trim: true
    },
    isRead: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Message', messageSchema);
