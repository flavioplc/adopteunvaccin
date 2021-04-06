const ConfirmToken = require('../schemas/confirmToken')

module.exports = {
  async createCandidateSubToken (candidateId, tokenType) {
    return ConfirmToken.create({ _candidate: candidateId, type: tokenType })
  },
  async createMedicSubToken (medicId, tokenType) {
    return ConfirmToken.create({ _medic: medicId, type: tokenType })
  },
  async deleteCandidateTokens (candidateId) {
    return ConfirmToken.deleteMany({ _candidate: candidateId })
  },
  async deleteMedicTokens (medicId) {
    return ConfirmToken.deleteMany({ _medic: medicId })
  },
  async confirmeCandidateSubTokenExists (confirmTokenId, candidateId, tokenType) {
    const count = await ConfirmToken.countDocuments({
      _id: confirmTokenId,
      _candidate: candidateId,
      type: tokenType
    })

    return count > 0
  },
  async confirmeMedicSubTokenExists (confirmTokenId, medicId, tokenType) {
    const count = await ConfirmToken.countDocuments({
      _id: confirmTokenId,
      _medic: medicId,
      type: tokenType
    })

    return count > 0
  },
  async getConfirmToken (confirmTokenId, candidateId) {
    return ConfirmToken.findOne({
      _id: confirmTokenId,
      _candidate: candidateId
    })
  }
}
