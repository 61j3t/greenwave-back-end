const express = require('express');
const eventController = require('../controllers/eventController');
// const { ensureAuthenticated } = require('../middleware/auth');

const router = express.Router();

router.post('/', eventController.createEvent);
router.get('/', eventController.getAllEvents);
router.get('/:id', eventController.getEventById);
router.put('/:id', eventController.updateEvent);
router.delete('/:id', eventController.deleteEvent);

module.exports = router;
