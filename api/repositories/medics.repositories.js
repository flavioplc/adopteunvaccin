const Medic = require('../schemas/medic')

module.exports = {
  async create (medicParams) {
    const { firstName, lastName, email, phone, password, preferedVaccinationCenter, rpps } = medicParams
    const medic = await Medic.create({ firstName, lastName, email, password, phone, preferedVaccinationCenter, rpps })

    return medic
  },
  async alreadyExist (rpps) {
    const medicCount = await Medic.countDocuments({
      rpps,
      confirmedAt: { $exists: true }
    })

    return medicCount > 0
  },
  async confirmMedic (medicId) {
    return Medic.findOneAndUpdate({ _id: medicId }, { $set: { confirmedAt: Date.now() } })
  },
  async removePendingMedics (rpps, email) {
    await Medic.remove({
      $or: [
        { email },
        { rpps }
      ],
      confirmedAt: { $exists: false }
    })
  },
  async findMedic (email, rpps) {
    const medic = await Medic.findOne({
      email,
      rpps
    }).lean()
    return medic
  },
  edit (id, update) {
    return Medic.findOneAndUpdate({ _id: id }, update, { new: true })
  }
}
