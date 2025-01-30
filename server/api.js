/*
|--------------------------------------------------------------------------
| api.js -- server routes
|--------------------------------------------------------------------------
|
| This file defines the routes for your server.
|
*/

const express = require("express");

// import models so we can interact with the database
const User = require("./models/user");
const Note = require("./models/note");
const Comment = require("./models/comment");

// import authentication library
const auth = require("./auth");

const sharp = require('sharp');

// api endpoints: all these paths will be prefixed with "/api/"
const router = express.Router();

//initialize socket
const socketManager = require("./server-socket");

router.post("/auth/google-login", auth.login);

router.post("/login", auth.login);
router.post("/logout", auth.logout);
router.get("/whoami", (req, res) => {
  if (!req.user) {
    // not logged in
    return res.send({});
  }

  res.send(req.user);
});

router.post("/initsocket", (req, res) => {
  // do nothing if user not logged in
  if (req.user)
    socketManager.addUser(req.user, socketManager.getSocketFromSocketID(req.body.socketid));
  res.send({});
});


// |------------------------------|
// | write your API methods below!|
// |------------------------------|
// GET all notes (you can filter by public/private if needed)
// api/noteRoutes.js (modified)
// Get all notes created by the logged-in user
router.get("/mynotes", async (req, res) => {
  console.log("User in request:", req.user); // Add this for debugging
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const userNotes = await Note.find({ creator_id: req.user._id }); // or { creator_id: req.user._id }
    res.json(userNotes);
  } catch (error) {
    res.status(500).json({ message: "Error fetching notes" });
  }
});

// Get all public notes created by any user
router.get("/publicnotes", async (req, res) => {
  try {
    const publicNotes = await Note.find({ isPublic: true });
    res.json(publicNotes);
  } catch (error) {
    res.status(500).json({ message: "Error fetching notes" });
  }
});

router.post("/notes", async (req, res) => {
  console.log("POST /notes route hit");

  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const { content, isPublic } = req.body;
  const creator_id = req.user._id;

  console.log("Received creator_id in backend: ", creator_id);

  try {
    // Create the new note and log the note object before saving
    const newNote = new Note({
      content,
      creator_name: req.user.name,  // Link note to the logged-in user's name
      creator_id: creator_id,       // Store user's unique ID
      isPublic,
    });

    // Log the note object to see if the creator_id is set correctly
    console.log("New note object before saving:", newNote);

    await newNote.save();

    // Log the note after it's saved
    console.log("New note added:", newNote);

    res.status(201).json(newNote);
  } catch (error) {
    res.status(500).json({ message: "Error saving note" });
  }
});

router.get("/comment", (req, res) => {
  Comment.find({ parent: req.query.parent }).then((comments) => {
    res.send(comments);
  });
});

router.post("/comment", auth.ensureLoggedIn, (req, res) => {
  const newComment = new Comment({
    creator_id: req.user._id,
    creator_name: req.user.name,
    parent: req.body.parent,
    content: req.body.content,
  });

  newComment.save().then((comment) => res.send(comment));
});

router.get("/profile/:userId", (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      res.json({
        name: user.name,
        bio: user.bio,
        profilePicture: user.profilePicture,
      });
    })
    .catch((err) => {
      console.error("Error fetching profile:", err);
      res.status(500).json({ error: "Internal server error" });
    });
});

router.post("/profile/:userId", (req, res) => {
  const { name, bio, profilePicture } = req.body;

  // Validate that the user is updating their own profile
  if (req.user._id !== req.params.userId) {
    return res.status(403).json({ error: "Unauthorized" });
  }

  User.findByIdAndUpdate(
    req.params.userId,
    {
      $set: {
        name: name,
        bio: bio,
        profilePicture: profilePicture,
      },
    },
    { new: true }
  )
    .then((user) => {
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      res.json({
        ok: true,
        user: {
          name: user.name,
          bio: user.bio,
          profilePicture: user.profilePicture,
        },
      });
    })
    .catch((err) => {
      console.error("Error updating profile:", err);
      res.status(500).json({ error: "Internal server error" });
    });
});

// In your `api.js` or the relevant routes file:
// In your `api.js` or the relevant routes file:
router.post("/updateUsername", async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const { name } = req.body;

  try {
    // Update the user's name in the database
    const updatedUser = await User.findByIdAndUpdate(req.user._id, { name }, { new: true });

    // Update the session with the new name
    req.user.name = updatedUser.name;  // Update the session object

    // Update the creator_name in all notes associated with this user
    await Note.updateMany(
      { creator_id: req.user._id },
      { $set: { creator_name: updatedUser.name } }
    );

    res.status(200).json({ message: "Username and associated notes updated", user: updatedUser });
  } catch (error) {
    console.error("Error updating username and notes:", error);
    res.status(500).json({ message: "Error updating username and notes" });
  }
});

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
