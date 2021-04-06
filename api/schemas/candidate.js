const mongoose = require('mongoose')
const pointSchema = require('./point')

const candidateSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  birthDate: {
    type: Date,
    required: true
  },
  preferedVaccinationCenter: {
    type: {
      location: {
        type: pointSchema,
        index: '2dsphere'
      },
      name: String,
      gid: String
    },
    required: true
  },
  weekAvailability: {
    type: [String],
    required: true
  },
  weekendAvailability: {
    type: [String],
    required: true
  },
  email: {
    type: String,
    required: true
  },
  confirmedAt: {
    type: Date
  },
  contactedAt: {
    type: Date
  },
  contactedBy: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Medic'
  }

}, { timestamps: true })

module.exports = mongoose.model('Candidate', candidateSchema)
