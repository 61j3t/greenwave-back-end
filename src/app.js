require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const routes = require('./routes');
const connection = require("./database")

// db connection 
connection()

// Middleware to parse JSON requests
app.use(express.json());
app.use(cors());


// Use the routes defined in routes.js
app.use('/api', routes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
