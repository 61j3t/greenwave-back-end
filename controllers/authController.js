const User = require('../models/User');
const bcrypt = require('bcryptjs');

// Register a new user
exports.register = async (req, res) => {
  const { username, email, password, role } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('Original password:', password);
    console.log('Hashed password (before save):', hashedPassword);

    user = new User({
      username,
      email,
      password: hashedPassword,
      role
    });

    const savedUser = await user.save();
    console.log('Saved user object:', savedUser);
    console.log('Hashed password (after save):', savedUser.password);

    res.status(201).json({ msg: 'User registered successfully.' });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ msg: 'Server error' });
  }
};

// Login a user
exports.login = (req, res) => {
  console.log('Authenticated user:', req.user); // Add this line to check the req.user object
  res.json({ msg: 'Logged in successfully' });
};

// Logout a user
exports.logout = (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ msg: 'Logout failed' });
    }
    res.json({ msg: 'Logged out successfully' });
  });
};
