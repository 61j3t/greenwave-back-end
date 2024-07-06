const express = require('express');
const app = express();
const routes = require('./routes');

// Middleware to parse JSON requests
app.use(express.json());

// Use the routes defined in routes.js
app.use('/api', routes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
