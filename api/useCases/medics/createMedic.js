const medicsRepositories = require('../../repositories/medics.repositories')
const confirmTokenRepositories = require('../../repositories/confirmToken.repositories')
const { isValidEmail, isValidPhone, mailer } = require('../../utils')
const bcrypt = require('bcryptjs')

async function shouldExecute (rpps, email, password, phone) {
  const regexPatern = '^(?=(.*[a-z]){1,})(?=(.*[A-Z]){1,})(?=(.*[0-9]){1,})(?=(.*[!@#$%^&*()__+.]){1,}).{8,}$'
  const flag = 'g'
  const strongRegex = new RegExp(regexPatern, flag)

  if (!strongRegex.test(password)) throw new Error('Password is weak')

  if (!isValidEmail(email)) {
    throw new Error('This email is invalid')
  }
  if (!isValidPhone(phone)) {
    throw new Error('This phone is invalid')
  }

  const alreadyExists = await medicsRepositories.alreadyExist(rpps)

  if (alreadyExists) {
    throw new Error('This rpps is already registered')
  } else {
    return true
  }
}

async function execute (medicParams) {
  const { password } = medicParams

  const salt = await bcrypt.genSalt()
  const hashPassword = await bcrypt.hash(password, salt)
  const medicToCreate = {
    ...medicParams,
    password: hashPassword
  }
  const newMedic = await medicsRepositories.create(medicToCreate)
  const confirmToken = await confirmTokenRepositories.createMedicSubToken(newMedic._id, 'medic-sub')
  const msg = {
    to: newMedic.email,
    from: 'adopteunvaccin.fr <contact@adopteunvaccin.fr>',
    templateId: 'd-7082b46cf19b4db584ca040d21549d8e',
    dynamicTemplateData: {
      firstName: newMedic.firstName,
      confirmLink: `${process.env.LANDING_PAGE_URL}/api/medics/${newMedic._id}/confirm/${confirmToken._id}`
    }
  }
  mailer.send(msg)
}

module.exports = async (medicParams) => {
  const { rpps, email, password, phone } = medicParams
  const valid = await shouldExecute(rpps, email, password, phone)

  if (valid) {
    try {
      return await execute(medicParams)
    } catch (err) {
      throw new Error(err)
    }
  }
}
