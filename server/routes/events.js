const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const Event = require("../models/event");
const User = require("../models/user");
require("dotenv").config();

const authenticateToken = require("../middleware/authMiddleware");

router.get("/", authenticateToken, async (req, res) => {
  try {
    console.log(req.user + " is the user");
    const userEvents = await Event.find({ userId: req.user._id });
    res.json(userEvents);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

router.get("/home", authenticateToken, (req, res) => {
  res.send(req.user.username);
});

module.exports = router;
