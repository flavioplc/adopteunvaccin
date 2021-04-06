const medicsUseCases = require('../useCases/medics')
const medicsRepositories = require('../repositories/medics.repositories')
const macros = require('../server-utils/macros')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

module.exports = {
  createMedic (params) {
    const requiredParams = ['firstName', 'lastName', 'email', 'password', 'phone', 'rpps', 'preferedVaccinationCenter']
    const medicParams = {}
    for (const param of requiredParams) {
      if (!params[param]) {
        throw new Error(`parameter ${param} is missing`)
      }
      medicParams[param] = params[param]
    };

    return medicsUseCases.createMedic(medicParams)
  },

  confirmMedic (medicId, tokenId) {
    if (!medicId || !tokenId) {
      throw new Error('Something went wrong')
    }

    return medicsUseCases.confirmMedic(medicId, tokenId)
  },

  editMedic (id, params, user) {
    if (id !== user._id && user.role !== macros.users.role.admin) {
      throw new Error('You can\'t edit this user')
    }

    const editableParams = ['firstName', 'lastName', 'description', 'cities', 'profilePicture', 'domains', 'skills']
    const update = {}

    for (const param in editableParams) {
      if (params[param]) {
        update[param] = params[param]
      }
    }

    return medicsRepositories.edit(id, update)
  },

  async medicLogin (params) {
    const { email, rpps, password } = params
    const requiredParams = ['email', 'password', 'rpps']

    requiredParams.forEach(param => {
      if (!params[param]) {
        throw new Error(`parameter ${param} is missing`)
      }
    })

    const medic = await medicsRepositories.findMedic(email, rpps)

    if (!medic) {
      throw new Error('Medic not found')
    } else {
      const isValidUser = await bcrypt.compare(password, medic.password)
      if (!isValidUser) {
        throw new Error('Wrong password')
      } else {
        return jwt.sign(medic, process.env.TOKEN_SECRET)
      }
    }
  }
}
