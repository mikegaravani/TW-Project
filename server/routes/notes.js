const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../models/user');
const Note = require('../models/note');
require('dotenv').config();

const authenticateToken = require('../middleware/authMiddleware');

// authenticateToken middleware is applied to all routes in this file
router.use(authenticateToken);

router.post('/new', async (req, res) => {
    try {
        const note = new Note({
            userId: req.user._id,
            title: req.body.title,
            content: req.body.content,
        });
        await note.save();
        res.status(201).json(note);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});


module.exports = router;