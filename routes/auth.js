const express = require('express');
const passport = require('passport');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/register', authController.register);
router.post('/login', (req, res, next) => {
  console.log('Login request received with email:', req.body.email); // Log the email from the request
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      console.log('User not found:', info); // Log the info object
      return res.status(401).json({ msg: 'Authentication failed', info });
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      return res.json({ msg: 'Logged in successfully' });
    });
  })(req, res, next);
});


router.get('/logout', authController.logout);

module.exports = router;
