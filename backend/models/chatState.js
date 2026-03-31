const mongoose = require('mongoose');

const chatStateSchema = new mongoose.Schema({
  key: { type: String, required: true, unique: true, default: 'global' },
  frontendHiddenBefore: { type: Date, default: null },
}, { timestamps: true });

const ChatState = mongoose.model('ChatState', chatStateSchema);

module.exports = ChatState;