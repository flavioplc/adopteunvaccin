const medicsRepositories = require('../../repositories/medics.repositories')
const confirmTokenRepositories = require('../../repositories/confirmToken.repositories')
const { mailer } = require('../../utils')

async function shouldExecute (medicId, tokenId) {
  const tokenExists = confirmTokenRepositories.confirmeMedicSubTokenExists(tokenId, medicId, 'medic-sub')
  if (!tokenExists) {
    throw new Error('Something went wrong')
  } else {
    return true
  }
}

async function execute (medicId) {
  const medic = await medicsRepositories.confirmMedic(medicId)
  await medicsRepositories.removePendingMedics(medic.rpps)
  await confirmTokenRepositories.deleteMedicTokens(medic._id)
  const msg = {
    to: medic.email,
    from: 'adopteunvaccin.fr <contact@adopteunvaccin.fr>',
    templateId: 'd-ff2789a04924470e95eb365cbd60b172',
    dynamicTemplateData: {
      firstName: medic.firstName
    }
  }
  mailer.send(msg)
}

module.exports = async (medicId, tokenId) => {
  const valid = await shouldExecute(medicId, tokenId)

  if (valid) {
    return await execute(medicId, tokenId)
  }
}
