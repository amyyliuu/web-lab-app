const { OAuth2Client } = require("google-auth-library");
const User = require("./models/user");
const socketManager = require("./server-socket");

// create a new OAuth client used to verify google sign-in
//    TODO: replace with your own CLIENT_ID
const CLIENT_ID = "575781117335-ujknn7mth3j677jdd9i6mk9fo4s2qrql.apps.googleusercontent.com";
const client = new OAuth2Client(CLIENT_ID);

// accepts a login token from the frontend, and verifies that it's legit
function verify(token) {
  return client
    .verifyIdToken({
      idToken: token,
      audience: CLIENT_ID,
    })
    .then((ticket) => ticket.getPayload());
}

// Get or create user with profile fields
function getOrCreateUser(user) {
  return User.findOne({ googleid: user.sub }).then((existingUser) => {
    if (existingUser) return existingUser;

    const newUser = new User({
      name: user.name,
      googleid: user.sub,
      profilePicture: '',  // Default profile picture (optional)
      bio: '',              // Default bio (optional)
    });

    return newUser.save();
  });
}

// User login (with session persistence)
function login(req, res) {
  verify(req.body.token)
    .then((user) => getOrCreateUser(user))
    .then((user) => {
      req.session.user = user;  // Store user in session
      res.send(user);
    })
    .catch((err) => {
      console.log(`Failed to log in: ${err}`);
      res.status(401).send({ err });
    });
}

// Logout (clear session)
function logout(req, res) {
  req.session.user = null;
  res.send({});
}

// Middleware to populate req.user from session
function populateCurrentUser(req, res, next) {
  req.user = req.session.user;  // Store user in req.user from session
  next();
}

// Ensure user is logged in (middleware)
function ensureLoggedIn(req, res, next) {
  if (!req.user) {
    return res.status(401).send({ err: "not logged in" });
  }

  next();
}

// Profile Update (if user is logged in)
function updateProfile(req, res) {
  const { name, bio, profilePicture } = req.body;
  const userId = req.user._id;  // Get the logged-in user's ID

  User.findByIdAndUpdate(
    userId,
    { name, bio, profilePicture },  // Update profile fields
    { new: true }
  )
    .then((updatedUser) => {
      if (!updatedUser) {
        return res.status(404).send({ message: "User not found" });
      }

      // Update session with new profile data
      req.session.user = updatedUser;
      res.status(200).json(updatedUser);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: "Error updating profile" });
    });
}

module.exports = {
  login,
  logout,
  populateCurrentUser,
  ensureLoggedIn,
  updateProfile,  // Export the profile update function
};
