const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../models/user');
require('dotenv').config();

// Routes for user authentication and management

// User signup
router.post('/', async (req, res) => {
    const { username, password, email } = req.body;

    if (!username || !password || !email) {
        return res.status(400).json({ message: 'Username, password, and email are required.' });
    }

    try {
        // Username in use
        const existingUsername = await User.findOne({ username });
        if (existingUsername) {
            return res.status(409).json({ message: 'Username is already in use.' });
        }

        // Email in use
        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            return res.status(409).json({ message: 'Email is already in use.' });
        }

        const newUser = new User({
            username,
            password,
            email
        });

        const savedUser = await newUser.save();

        // Assign token
        const token = jwt.sign({ id: savedUser._id }, process.env.JWT_SECRET)
        res.status(201).json({ message: 'Signup successful', token,  userId: savedUser._id });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});



// User login
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }
    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }

        if (password !== user.password) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }


        // Assign token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        return res.status(200).json({ message: 'Login successful', token, userId: user._id });

    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
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
        console.log('All users fetched');
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









// Various middleware functions






// Fetch user by ID
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