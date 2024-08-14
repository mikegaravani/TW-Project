const express = require('express');
const router = express.Router();
const User = require('../models/user');

// Routes for user authentication and management
// User registration
router.post('/register', async (req, res) => {
    const newUser = new User({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email
    });

    try {
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});
// User login
router.post('/login', (req, res) => {
    
});
// User logout
router.post('/logout', (req, res) => {
    
});
// Fetch user profile
router.get('/:id', getUser, (req, res) => {
    res.json(res.user);
});
// Fetch all users
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
// User profile update
router.patch('/:id', getUser, async (req, res) => {
    if (req.body.username != null) {
        res.user.username = req.body.username;
    }
    if (req.body.password != null) {
        res.user.password = req.body.password;
    }
    if (req.body.email != null) {
        res.user.email = req.body.email;
    }
    try {
        const updatedUser = await res.user.save();
        res.json(updatedUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});
// User profile deletion
router.delete('/:id', getUser, async (req, res) => {
    try {
        await res.user.deleteOne();
        res.json({ message: 'User deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});



async function getUser(req, res, next) {
    let aUser;
    try {
        aUser = await User.findById(req.params.id);
        if (aUser == null) {
            return res.status(404).json({ message: 'User not found' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

    res.user = aUser;
    next();
}


module.exports = router;