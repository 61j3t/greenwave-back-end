const express = require('express');
const eventController = require('../controllers/eventController');
// const { ensureAuthenticated } = require('../middleware/auth');

const router = express.Router();

// Create a new event
router.post('/', eventController.createEvent);

// Get all events
router.get('/', eventController.getAllEvents);

// Get a single event by ID
router.get('/:id', eventController.getEventById);

// Update an event
router.put('/:id', eventController.updateEvent);

// Delete an event
router.delete('/:id', eventController.deleteEvent);

module.exports = router;
