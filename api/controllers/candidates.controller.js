const candidatesUseCases = require('../useCases/candidates')
const candidatesRepositories = require('../repositories/candidates.repositories')
module.exports = {
  createCandidate (params) {
    const requiredParams = ['firstName', 'lastName', 'email', 'birthDate', 'phone', 'preferedVaccinationCenter', 'weekAvailability', 'weekendAvailability']
    const filteredParams = {}

    requiredParams.forEach(param => {
      if (!params[param]) {
        throw new Error(`parameter ${param} is missing`)
      }
      filteredParams[param] = params[param]
    })

    return candidatesUseCases.createCandidate(filteredParams)
  },
  confirmCandidate (candidateId, tokenId) {
    if (!candidateId || !tokenId) {
      throw new Error('Something went wrong')
    }

    return candidatesUseCases.confirmCandidate(candidateId, tokenId)
  },
  async disableCandidate (candidateId, medicId) {
    if (!candidateId || !medicId) {
      throw new Error('Something went wrong')
    }

    await candidatesRepositories.disableCandidate(candidateId, medicId)
  }

}
