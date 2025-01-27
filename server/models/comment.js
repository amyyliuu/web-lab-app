const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  content: String,
  creator_name: String,
  noteId: { type: mongoose.Schema.Types.ObjectId, ref: "Note" },
});

module.exports = mongoose.model("Comment", CommentSchema);
