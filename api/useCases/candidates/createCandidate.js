const candidatesRepositories = require('../../repositories/candidates.repositories')
const confirmTokenRepositories = require('../../repositories/confirmToken.repositories')
const { isValidEmail, isValidPhone, mailer } = require('../../utils')

async function shouldExecute (email, phone) {
  if (!isValidEmail(email)) {
    throw new Error('This email is invalid')
  }
  if (!isValidPhone(phone)) {
    throw new Error('This phone is invalid')
  }
  const alreadyExists = await candidatesRepositories.alreadyExist(email)

  if (alreadyExists) {
    throw new Error('This email Already registered')
  } else {
    return true
  }
}

async function execute (candidateParams) {
  const { email } = candidateParams
  const candidate = await candidatesRepositories.create(candidateParams)
  const confirmToken = await confirmTokenRepositories.createCandidateSubToken(candidate._id, 'subscribe')
  const msg = {
    to: email,
    from: 'adopteunvaccin.fr <contact@adopteunvaccin.fr>',
    templateId: 'd-e092ee36d91c4fb2b896eea54459ef09',
    dynamicTemplateData: {
      firstName: candidate.firstName,
      confirmLink: `${process.env.LANDING_PAGE_URL}/api/candidates/${candidate._id}/confirm/${confirmToken._id}`
    }
  }
  mailer.send(msg)
}

module.exports = async (candidateParams) => {
  const { email, phone } = candidateParams
  const valid = await shouldExecute(email, phone)

  if (valid) {
    return await execute(candidateParams)
  }
}
