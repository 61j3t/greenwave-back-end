const express = require('express');
const passport = require('passport');
const authController = require('../controllers/authController');

const router = express.Router();

// Register route
router.post('/register', authController.register);

// Login route
router.post('/login', (req, res, next) => {
  console.log('Login request received with email:', req.body.email); // Log the email from the request
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      console.error('Error during authentication:', err);
      return next(err);
    }
    if (!user) {
      console.log('User not found or incorrect password:', info); // Log the info object
      return res.status(401).json({ msg: 'Authentication failed', info });
    }
    req.logIn(user, (err) => {
      if (err) {
        console.error('Error during login:', err);
        return next(err);
      }
      console.log('User logged in successfully:', user);
      return res.json({ msg: 'Logged in successfully' });
    });
  })(req, res, next);
});

// Logout route
router.get('/logout', authController.logout);

module.exports = router;
