const Event = require('../models/Event');

exports.createEvent = async (req, res) => {
    const { title, description, date, location, objective, createdBy } = req.body;
    try {
      const event = new Event({
        title,
        description,
        date,
        location,
        objective,
        createdBy // Accepting createdBy from the request body
      });
      await event.save();
      res.status(201).json(event);
    } catch (error) {
      res.status(500).json({ msg: 'Server error', error: error.message });
    }
  };

exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.find().populate('createdBy', 'username email');
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ msg: 'Server error', error: error.message });
  }
};

exports.getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id).populate('createdBy', 'username email');
    if (!event) {
      return res.status(404).json({ msg: 'Event not found' });
    }
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ msg: 'Server error', error: error.message });
  }
};

exports.updateEvent = async (req, res) => {
  const { title, description, date, location, objective } = req.body;
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ msg: 'Event not found' });
    }

    // if (event.createdBy.toString() !== req.user._id.toString()) {
    //   return res.status(403).json({ msg: 'Unauthorized' });
    // }

    event.title = title || event.title;
    event.description = description || event.description;
    event.date = date || event.date;
    event.location = location || event.location;
    event.objective = objective || event.objective;

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
