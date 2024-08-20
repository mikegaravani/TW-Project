const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const Event = require('../models/event');
require('dotenv').config();



// Routes for events
router.get('/', authenticateToken, async (req, res) => {
    try {
        const userEvents = await Event.find({ userId: req.user._id });
        res.json(userEvents);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});





// Token authentication
function authenticateToken(req, res, next) {
    const token = req.headers['authorization'];
    if (token == null) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Forbidden' });
        }
        req.user = user;
        next();
    });
}


module.exports = router;