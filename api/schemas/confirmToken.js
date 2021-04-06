const mongoose = require('mongoose')

const confirmTokenSchema = mongoose.Schema({
  _candidate: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Candidate'
  },
  _medic: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Medic'
  },
  type: {
    type: String,
    enum: ['subscribe', 'unsuscribe', 'medic-sub', 'medic-unsub'],
    required: true
  }
}, { timestamps: true })

module.exports = mongoose.model('ConfirmToken', confirmTokenSchema)
