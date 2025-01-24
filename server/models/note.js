// models/Note.js
const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
  content: { type: String, required: true },
  creator_name: { type: String, required: true }, // You can link this to the logged-in user
  isPublic: { type: Boolean, default: false },
});

module.exports = mongoose.model("note", noteSchema);
