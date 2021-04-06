const Candidate = require('../schemas/candidate')

module.exports = {
  async create (candidateParams) {
    const { firstName, lastName, email, phone, preferedVaccinationCenter, weekAvailability, weekendAvailability, birthDate } = candidateParams
    const candidate = await Candidate.create({
      firstName,
      lastName,
      birthDate,
      email,
      phone,
      preferedVaccinationCenter,
      weekAvailability,
      weekendAvailability
    })

    return candidate
  },
  async confirmCandidate (candidateId) {
    return Candidate.findOneAndUpdate({ _id: candidateId }, { $set: { confirmedAt: Date.now() } })
  },
  async disableCandidate (candidateId, medicId) {
    return Candidate.findOneAndUpdate({ _id: candidateId }, { $set: { contactedAt: Date.now(), contactedBy: medicId } })
  },
  async alreadyExist (email) {
    const userCount = await Candidate.countDocuments({
      email,
      confirmedAt: { $exists: true }
    })

    return userCount > 0
  },
  async getPaginated (page, perPage, weekAvailability, weekendAvailability, coordinates, distance) {
    const skip = perPage * (page - 1)

    return Candidate.find({
      confirmedAt: { $exists: true },
      contactedAt: { $exists: false },
      $or: [
        { weekAvailability: { $in: [...weekAvailability, 'allDay'] } },
        { weekendAvailability: { $in: [...weekendAvailability, 'allDay'] } }
      ],
      'preferedVaccinationCenter.location.coordinates': {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates
          },
          $maxDistance: distance
        }
      }
    }).skip(skip).limit(perPage).lean()
  },
  async getCount (weekAvailability, weekendAvailability, coordinates, distance) {
    const ids = await Candidate.find({
      confirmedAt: { $exists: true },
      contactedAt: { $exists: false },
      $or: [
        { weekAvailability: { $in: [...weekAvailability, 'allDay'] } },
        { weekendAvailability: { $in: [...weekendAvailability, 'allDay'] } }
      ],
      'preferedVaccinationCenter.location.coordinates': {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates
          },
          $maxDistance: distance
        }
      }
    }).select('_id')

    return ids.length
  },
  async removePendingCandidates (email) {
    await Candidate.remove({
      email,
      confirmedAt: { $exists: false }
    })
  }
}
