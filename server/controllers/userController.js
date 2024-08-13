// TO TRANSFER


const User = require('../models/user');

exports.register = async (req, res) => {
  const { username, password, name, email } = req.body;
  try {
    const newUser = new User({ username, password, name, email });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username, password });
    if (!user) throw new Error('Invalid credentials');
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
