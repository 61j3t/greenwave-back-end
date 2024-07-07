const express = require('express');
const passport = require('passport');
const authController = require('../controllers/authController');

const router = express.Router();

// Google Auth
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', passport.authenticate('google', {
  failureRedirect: '/login',
  successRedirect: '/'
}));

// Register
router.post('/register', authController.register);

// Email Verification
router.post('/verify-email', authController.verifyEmail);

// Login
router.post('/login', passport.authenticate('local'), authController.login);

// Logout
router.get('/logout', authController.logout);

module.exports = router;
