const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');
const bcrypt = require('bcryptjs');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

passport.use(new LocalStrategy({
  usernameField: 'email'
}, async (email, password, done) => {
  console.log('Attempting login with email:', email);
  try {
    const user = await User.findOne({ email });
    if (!user) {
      console.log('User not found for email:', email); // Log the email if user is not found
      return done(null, false, { message: 'User not found' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log('Incorrect password for email:', email); // Log the email and password mismatch
      return done(null, false, { message: 'Incorrect password' });
    }
    console.log('User authenticated successfully for email:', email);
    done(null, user);
  } catch (err) {
    console.error('Error during authentication for email:', email, 'Error:', err); // Log the error with email
    done(err);
  }
}));



module.exports = passport;
