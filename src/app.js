require('dotenv').config();  // Ensure this is at the top
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const routes = require('./routes');
const connection = require('./database');
const userRoutes = require('./Routes/users');
const authRoutes = require('./Routes/auth');

const app = express();

// Database connection
connection();

// Middleware to parse JSON requests
app.use(express.json());
app.use(cors());
app.use(helmet());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api', routes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
