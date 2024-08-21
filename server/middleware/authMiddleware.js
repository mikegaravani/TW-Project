const jwt = require('jsonwebtoken');
const User = require('../models/user');
require('dotenv').config();


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

module.exports = authenticateToken;