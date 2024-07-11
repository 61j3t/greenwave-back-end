const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const stepSchema = new Schema({
  stepNumber: { type: Number, required: true },
  stepName: { type: String, required: true }
}, { _id: false });

const eventSchema = new Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  location: { type: String, required: true },
  objective: {
    time: { type: Number, required: true },
    quantity: { type: Number, required: true },
    surface: { type: Number, required: true }
  },
  createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, enum: ['En cours', 'Terminé', 'À venir'], default: 'À venir' },
  participants: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  currentStepIndex: { type: Number, default: 0 }, // Index of the current step in the steps array
  steps: {
    type: [stepSchema],
    default: [
      { stepNumber: 1, stepName: 'Red Light, Green Light' },
      { stepNumber: 2, stepName: 'Step 2 Name' },
      { stepNumber: 3, stepName: 'Step 3 Name' },
      { stepNumber: 4, stepName: 'Step 4 Name' },
      { stepNumber: 5, stepName: 'Step 5 Name' },
      { stepNumber: 6, stepName: 'Step 6 Name' }
    ]
  },
  teamA: {
    participants: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    quantity: { type: Number, default: 0 },
    lightStatus: { type: String, enum: ['red', 'green'], default: 'green' } // Default to green
  },
  teamB: {
    participants: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    quantity: { type: Number, default: 0 },
    lightStatus: { type: String, enum: ['red', 'green'], default: 'green' } // Default to green
  }
});

const Event = mongoose.model('Event', eventSchema);
module.exports = Event;
