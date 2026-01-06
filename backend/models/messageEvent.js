const mongoose = require('mongoose');

const messageEventSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: ['create', 'edit', 'delete_everyone', 'upload'],
  },
  messageId: { type: String },
  deletedContent: { type: mongoose.Schema.Types.Mixed },
  oldText: { type: String },
  newText: { type: String },
  file: {
    originalname: String,
    mimetype: String,
    size: Number,
  },
  message: { type: mongoose.Schema.Types.Mixed },
  userId: { type: String, required: true },
  username: { type: String, required: true },
  timestamp: { type: Date, required: true },
}, { timestamps: true });

const MessageEvent = mongoose.model('MessageEvent', messageEventSchema);

module.exports = MessageEvent;
