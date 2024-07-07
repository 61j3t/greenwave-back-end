const User = require('../models/User');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');

// Configure Nodemailer
const transporter = nodemailer.createTransport({
  service: 'Gmail', // or any other email provider
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Generate a random 5-digit verification code
function generateVerificationCode() {
  return Math.floor(10000 + Math.random() * 90000).toString();
}

exports.register = async (req, res) => {
  const { username, email, password, role } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    const verificationCode = generateVerificationCode();
    const hashedPassword = await bcrypt.hash(password, 10);

    user = new User({
      username,
      email,
      password: hashedPassword,
      role,
      verificationCode,
      isVerified: false
    });

    await user.save();

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Email Verification',
      text: `Please verify your email by using the following code: ${verificationCode}`
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.error('Error sending email:', err);
        return res.status(500).json({ msg: 'Failed to send verification email' });
      }
      res.status(201).json({ msg: 'User registered successfully. Check your email for verification code.' });
    });
    
  } catch (error) {
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.verifyEmail = async (req, res) => {
  const { email, verificationCode } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'User not found' });
    }
    if (user.verificationCode !== verificationCode) {
      return res.status(400).json({ msg: 'Invalid verification code' });
    }
    user.isVerified = true;
    user.verificationCode = null;
    await user.save();
    res.status(200).json({ msg: 'Email verified successfully' });
  } catch (error) {
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.login = (req, res) => {
  if (!req.user.isVerified) {
    return res.status(400).json({ msg: 'Email not verified' });
  }
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
