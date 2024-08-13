const express = require('express');
const router = express.Router();
const User = require('../models/user');
// const UserController = require('../controllers/userController');

// Routes for user authentication and management
// User registration
router.post('/', async (req, res) => {
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
router.post('/', (req, res) => {
    
});
// User logout
router.post('/', (req, res) => {
    
});
// Fetch user profile
router.get('/:id', getUser, (req, res) => {
    res.send(res.user);
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
router.patch('/:id', getUser, (req, res) => {

});
// User profile deletion
router.delete('/:id', getUser, (req, res) => {
    
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