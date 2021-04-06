const candidatesRepositories = require('../../repositories/candidates.repositories')
const confirmTokenRepositories = require('../../repositories/confirmToken.repositories')
const { mailer } = require('../../utils')

async function shouldExecute (candidateId, tokenId) {
  const tokenExists = confirmTokenRepositories.confirmeCandidateSubTokenExists(tokenId, candidateId, 'subscribe')
  if (!tokenExists) {
    throw new Error('Something went wrong')
  } else {
    return true
  }
}

async function execute (candidateId) {
  const candidate = await candidatesRepositories.confirmCandidate(candidateId)
  await candidatesRepositories.removePendingCandidates(candidate.email)
  await confirmTokenRepositories.deleteCandidateTokens(candidateId)
  const msg = {
    to: candidate.email,
    from: 'adopteunvaccin.fr <contact@adopteunvaccin.fr>',
    templateId: 'd-878a4d37564648b5974bacf5a843c5c7',
    dynamicTemplateData: {
      firstName: candidate.firstName
    }
  }
  mailer.send(msg)
}

module.exports = async (candidateId, tokenId) => {
  const valid = await shouldExecute(candidateId, tokenId)

  if (valid) {
    return await execute(candidateId, tokenId)
  }
}
