const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const User = require("../models/user");
const Note = require("../models/note");
require("dotenv").config();

const authenticateToken = require("../middleware/authMiddleware");

// authenticateToken middleware is applied to all routes in this file
router.use(authenticateToken);

// Add a new note
router.post("/new", async (req, res) => {
  try {
    const note = new Note({
      userId: req.user._id,
      title: req.body.title,
      content: req.body.content,
    });
    await note.save();
    res.status(201).json(note);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all user's notes
router.get("/all", async (req, res) => {
  try {
    console.log(req.user._id);
    const notes = await Note.find({ userId: req.user._id });
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ error: "Error fetching notes" });
  }
});

// Delete a note
router.delete("/delete/:id", async (req, res) => {
  try {
    const note = await Note.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });
    if (note == null) {
      return res.status(404).json({ error: "Note not found" });
    }
    await note.deleteOne();
    res.status(204).json();
  } catch (error) {
    res.status(500).json({ error: "Error deleting note" });
  }
});

// Update a note
router.put("/update/:id", async (req, res) => {
  try {
    const note = await Note.findByIdAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      req.body,
      { new: true, runValidators: true }
    );
    if (note == null) {
      return res.status(404).json({ error: "Note not found" });
    }
    res.status(200).json(note);
  } catch (error) {
    res.status(500).json({ error: "Error updating note" });
  }
});

module.exports = router;
