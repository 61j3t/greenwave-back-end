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
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['En cours', 'Terminé', 'À venir'],
    default: 'À venir'
  },
  participants: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  teamA: {
    participants: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }],
    quantity: {
      type: Number,
      default: 0
    }
  },
  teamB: {
    participants: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }],
    quantity: {
      type: Number,
      default: 0
    }
  }
});

// Virtual property to determine if the event should be "Terminé"
EventSchema.virtual('isTerminated').get(function() {
  return (this.teamA.quantity + this.teamB.quantity) >= this.objective.quantity;
});

// Middleware to update status when team quantities change or isTerminated virtual changes
// EventSchema.pre('save', function(next) {
//   if (this.isModified('teamA') || this.isModified('teamB') || this.isModified('objective.quantity')) {
//     if (this.teamA.quantity + this.teamB.quantity >= this.objective.quantity) {
//       this.status = 'Terminé';
//     } else {
//       this.status = 'En cours'; // Adjust status if needed
//     }
//   }
//   next();
// });

const Event = mongoose.model('Event', EventSchema);
module.exports = Event;
