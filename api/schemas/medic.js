const mongoose = require('mongoose')
const pointSchema = require('./point')

const medicSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  preferedVaccinationCenter: {
    type: {
      location: pointSchema,
      index: '2dsphere',
      name: String,
      gid: String
    }
  },
  rpps: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  confirmedAt: {
    type: Date
  },
  verified: {
    type: Boolean,
    default: false
  }
}, { timestamps: true })

module.exports = mongoose.model('Medic', medicSchema)
