const User = require('../models/User');
const bcrypt = require('bcryptjs');

exports.register = async (req, res) => {
  const { username, email, password, role } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user = new User({
      username,
      email,
      password: hashedPassword,
      role
    });

    await user.save();

    res.status(201).json({ msg: 'User registered successfully.' });
  } catch (error) {
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.login = (req, res) => {
  console.log(req.user); // Add this line to check the req.user object
  res.json({ msg: 'Logged in successfully' });
};


exports.logout = (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ msg: 'Logout failed' });
    }
    res.json({ msg: 'Logged out successfully' });
  });
};
