const mongoose = require("mongoose");


const UserSchema = new mongoose.Schema({
  name: String,
  googleid: String,  // For Google OAuth
  bio: {
    type: String,
    default: "",
  },
  profilePicture: {
    type: String,
    default: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwIiBoZWlnaHQ9IjE1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTUwIiBoZWlnaHQ9IjE1MCIgZmlsbD0iI2YwZjBmMCIgcng9Ijc1IiByeT0iNzUiLz48cGF0aCBkPSJNNzUgODBjMTMuOCAwIDI1LTExLjIgMjUtMjVTODguOCAzMCA3NSAzMCA1MCA0MS4yIDUwIDU1czExLjIgMjUgMjUgMjV6TTM3LjUgMTEwaDc1YzAgMCAwLTEwLTEyLjUtMTUtMTIuNS01LTUwLTUtNjIuNSAwLTEyLjUgNS0xMi41IDE1LTEyLjUgMTV6IiBmaWxsPSIjOTA5MDkwIi8+PC9zdmc+"
  },
  notes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Note",
  }],
  dateCreated: {
    type: Date,
    default: Date.now,
  },
  lastLogin: {
    type: Date,
    default: Date.now,
  },
});

// Update lastLogin timestamp on each login
UserSchema.methods.updateLastLogin = function() {
  this.lastLogin = Date.now();
  return this.save();
};

// Instance method to get public profile information
UserSchema.methods.getPublicProfile = function() {
  return {
    _id: this._id,
    name: this.name,
    bio: this.bio,
    profilePicture: this.profilePicture,
  };
};

module.exports = mongoose.model("User", UserSchema);
