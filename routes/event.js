const express = require('express');
const eventController = require('../controllers/eventController');

const router = express.Router();

/**
 * @swagger
 * /events:
 *   post:
 *     summary: Create a new event
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Event'
 *     responses:
 *       201:
 *         description: Event created successfully
 *       400:
 *         description: Invalid input
 */
router.post('/', eventController.createEvent);

/**
 * @swagger
 * /events:
 *   get:
 *     summary: Get all events
 *     responses:
 *       200:
 *         description: A list of events
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Event'
 */
router.get('/', eventController.getAllEvents);

/**
 * @swagger
 * /events/{id}:
 *   get:
 *     summary: Get event by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The event ID
 *     responses:
 *       200:
 *         description: Event details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Event'
 *       404:
 *         description: Event not found
 */
router.get('/:id', eventController.getEventById);

/**
 * @swagger
 * /events/{id}:
 *   put:
 *     summary: Update event by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The event ID
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Event'
 *     responses:
 *       200:
 *         description: Event updated
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Event not found
 */
router.put('/:id', eventController.updateEvent);

/**
 * @swagger
 * /events/{id}:
 *   delete:
 *     summary: Delete event by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The event ID
 *     responses:
 *       204:
 *         description: Event deleted
 *       404:
 *         description: Event not found
 */
router.delete('/:id', eventController.deleteEvent);

/**
 * @swagger
 * /events/{id}/participate:
 *   post:
 *     summary: Participate in an event
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The event ID
 *     responses:
 *       200:
 *         description: Participation successful
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Event not found
 */
router.post('/:id/participate', eventController.participateEvent);

/**
 * @swagger
 * /events/{id}/cancelParticipation:
 *   post:
 *     summary: Cancel participation in an event
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The event ID
 *     responses:
 *       200:
 *         description: Participation cancelled
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Event not found
 */
router.post('/:id/cancelParticipation', eventController.cancelParticipation);

/**
 * @swagger
 * /events/{eventId}/toggleLight/{team}:
 *   post:
 *     summary: Toggle light for a team
 *     parameters:
 *       - in: path
 *         name: eventId
 *         schema:
 *           type: string
 *         required: true
 *         description: The event ID
 *       - in: path
 *         name: team
 *         schema:
 *           type: string
 *           enum: [teamA, teamB]
 *         required: true
 *         description: The team (teamA or teamB)
 *     responses:
 *       200:
 *         description: Light toggled successfully
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Event not found
 */
router.post('/:eventId/toggleLight/:team', eventController.toggleLight);

/**
 * @swagger
 * /events/{id}/updateQuantity:
 *   put:
 *     summary: Update team quantity in an event
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The event ID
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               team:
 *                 type: string
 *                 enum: [teamA, teamB]
 *                 description: The team to update
 *               quantity:
 *                 type: number
 *                 description: The new quantity
 *             required:
 *               - team
 *               - quantity
 *     responses:
 *       200:
 *         description: Team quantity updated
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Event or team not found
 */
router.put('/:id/updateQuantity', eventController.updateTeamQuantity);

module.exports = router;
