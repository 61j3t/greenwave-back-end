const express = require('express');
const router = express.Router();

// Define a simple route
router.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Add more routes here
// Example:
// router.get('/example', (req, res) => {
//   res.json({ message: 'This is an example route' });
// });

module.exports = router;
