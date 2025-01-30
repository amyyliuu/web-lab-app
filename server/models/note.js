const mongoose = require("mongoose");

// Define the schema for the Note model
const noteSchema = new mongoose.Schema({
  content: { type: String, required: true },
  creator_name: { type: String, required: true },
  creator_id: String,
  isPublic: { type: Boolean, default: false },
});

module.exports = mongoose.model('Note', noteSchema);
