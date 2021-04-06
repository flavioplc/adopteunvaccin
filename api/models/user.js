const mongoose = require('mongoose')
const macros = require('../chore/macros')

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: Number,
    required: true,
    enum: Object.values(macros.users.role)
  },
  rpps: {
    type: String
  },
  confirmedAt: {
    type: Date
  }
}, { timestamps: true })

module.exports = mongoose.model('User', userSchema)
