const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const Event = require('../models/event');
const User = require('../models/user');
require('dotenv').config();


router.get('/', authenticateToken, async (req, res) => {
    try {
        console.log(req.user + " is the user");
        const userEvents = await Event.find({ userId: req.user._id });
        res.json(userEvents);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});


router.get('/home', authenticateToken, (req, res) => {
    res.send(`Welcome ${req.user.username}`);
});

// Token authentication
function authenticateToken(req, res, next) {
    const token = req.headers['authorization'];
    if (token == null) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
        if (err) {
            return res.status(403).json({ message: 'Forbidden' });
        }
        try {
            const user = await User.findById(decodedToken.id).select('username _id');
            req.user = user;
            next();
        } catch (error) {
            res.status(500).json({ message: 'Server error', error });
        }
    });
}


module.exports = router;