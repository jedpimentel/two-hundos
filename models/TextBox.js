const mongoose = require('mongoose');

const textBoxSchema = new mongoose.Schema({
  content: String,
  x: Number,
  y: Number,
  lastEdited: { type: Date, default: Date.now },
  isSaved: { type: Boolean, default: false }
});

module.exports = mongoose.model('TextBox', textBoxSchema);