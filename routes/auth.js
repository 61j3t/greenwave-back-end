const express = require('express');
const passport = require('passport');
const authController = require('../controllers/authController');

const router = express.Router();

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: User created
 *       400:
 *         description: Invalid input
 */
router.post('/register', authController.register);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login a user
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: User logged in
 *       401:
 *         description: Authentication failed
 */
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

/**
 * @swagger
 * /auth/logout:
 *   get:
 *     summary: Logout a user
 *     responses:
 *       200:
 *         description: User logged out
 */
router.get('/logout', authController.logout);

module.exports = router;
