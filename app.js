const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
require('dotenv').config();
const passportConfig = require('./config/passport');

const app = express();

app.use(cors());

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // secure: true if you're using HTTPS
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Swagger setup
const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Your API',
    version: '1.0.0',
    description: 'API documentation for your backend'
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Local server'
    }
  ]
};

const options = {
  swaggerDefinition,
  apis: ['./routes/*.js'] // Adjust this path according to your project structure
};

const swaggerSpec = swaggerJsdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes setup
const authRoutes = require('./routes/auth');
const eventRoutes = require('./routes/event');
const articleRoutes = require('./routes/article');

app.use('/auth', authRoutes);
app.use('/events', eventRoutes);
app.use('/articles', articleRoutes);

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Swagger docs are available at http://localhost:${PORT}/api-docs`);
});
