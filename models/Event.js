const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  objective: {
    time: {
      type: Number,
      required: true
    },
    quantity: {
      type: Number,
      required: true
    },
    surface: {
      type: Number,
      required: true
    }
  },
  status: {
    type: String,
    required: true,
    default: 'à venir'
  },
  participants: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

const Event = mongoose.model('Event', EventSchema);
module.exports = Event;
