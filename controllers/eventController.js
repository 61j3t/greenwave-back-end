const Event = require('../models/Event');

exports.createEvent = async (req, res) => {
  const { title, category, description, date, location, objective, status, createdBy } = req.body;
  
  try {
    // Create the event
    const event = new Event({
      title,
      category,
      description,
      date,
      location,
      objective,
      status,
      participants: [createdBy], // Include createdBy in participants array
      createdBy
    });

    // Save the event to the database
    await event.save();

    // Respond with the saved event
    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ msg: 'Server error', error: error.message });
  }
};

exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.find().populate('createdBy', 'username email').populate('participants', 'username email');
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ msg: 'Server error', error: error.message });
  }
};

exports.getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id).populate('createdBy', 'username email').populate('participants', 'username email');
    if (!event) {
      return res.status(404).json({ msg: 'Event not found' });
    }
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ msg: 'Server error', error: error.message });
  }
};

exports.updateEvent = async (req, res) => {
  const { title, category, description, date, location, objective, status, participants } = req.body;
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ msg: 'Event not found' });
    }

    // if (event.createdBy.toString() !== req.user._id.toString()) {
    //   return res.status(403).json({ msg: 'Unauthorized' });
    // }

    event.title = title || event.title;
    event.category = category || event.category;
    event.description = description || event.description;
    event.date = date || event.date;
    event.location = location || event.location;
    event.objective = objective || event.objective;
    event.status = status || event.status;
    event.participants = participants || event.participants;

    await event.save();
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({msg: 'Server error', error: error.message });
  }
};

exports.deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ msg: 'Event not found' });
    }

    await Event.findByIdAndDelete(req.params.id);
    res.status(200).json({ msg: 'Event deleted successfully' });
  } catch (error) {
    res.status(500).json({ msg: 'Server error', error: error.message });
  }
};


exports.participateEvent = async (req, res) => {
  const userId = req.body.userId; // Assuming userId is sent in the request body
  const eventId = req.params.id;

  try {
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ msg: 'Event not found' });
    }

    // Check if event status allows participation
    if (event.status === 'Terminé' || event.status === 'En cours') {
      return res.status(400).json({ msg: 'Cannot participate in an event that is Terminé or En cours' });
    }

    // Check if user is already participating
    if (event.participants.includes(userId)) {
      return res.status(400).json({ msg: 'User is already participating in this event' });
    }

    event.participants.push(userId);
    await event.save();

    res.status(200).json({ msg: 'User participated in the event successfully' });
  } catch (error) {
    res.status(500).json({ msg: 'Server error', error: error.message });
  }
};

exports.cancelParticipation = async (req, res) => {
  const userId = req.body.userId; // Assuming userId is sent in the request body
  const eventId = req.params.id;

  try {
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ msg: 'Event not found' });
    }

    // Check if event status allows cancellation of participation
    if (event.status === 'Terminé' || event.status === 'En cours') {
      return res.status(400).json({ msg: 'Cannot cancel participation in an event that is Terminé or En cours' });
    }

    // Check if user is participating in the event
    if (!event.participants.includes(userId)) {
      return res.status(400).json({ msg: 'User is not participating in this event' });
    }

    // Remove user from participants array using Mongoose pull method
    await Event.findByIdAndUpdate(eventId, {
      $pull: { participants: userId }
    });

    res.status(200).json({ msg: 'User cancelled participation in the event successfully' });
  } catch (error) {
    res.status(500).json({ msg: 'Server error', error: error.message });
  }
};
