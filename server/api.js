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

// import authentication library
const auth = require("./auth");

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
    const userNotes = await Note.find({ creator_name: req.user.name }); // or { creator_id: req.user._id }
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
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const { content, isPublic } = req.body;

  try {
    const newNote = new Note({
      content,
      creator_name: req.user.name, // Link note to the logged-in user's name
      creator_id: req.user._id,    // Optional: Store user's unique ID
      isPublic,
    });

    await newNote.save();
    res.status(201).json(newNote);
  } catch (error) {
    res.status(500).json({ message: "Error saving note" });
  }
});


// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
