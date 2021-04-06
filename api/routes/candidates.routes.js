const express = require('express')
const router = express.Router()
const verify = require('../middlewares/verifyToken')
const candidatesController = require('../controllers/candidates.controller')
const candidatesRepositories = require('../repositories/candidates.repositories')
const moment = require('moment')
// GET Routes
router.get('/', verify, async (req, res) => {
  const fields = {
    firstName: { label: 'Prénom', cols: 4, searchable: true },
    lastName: { label: 'Nom', cols: 4 },
    birthDate: { label: 'Date de naissance', cols: 4 },
    phone: { label: 'Téléphone', cols: 4 },
    'preferedVaccinationCenter.name': { label: 'Centre de vaccination', cols: 6 },
    weekAvailability: { label: 'Dispo semaine', cols: 4 },
    weekendAvailability: { label: 'Dispo wekend', cols: 4 },
    _actions: {
      delete: true,
      edit: false,
      view: false,
      extra: [
        // add extra buttons
        { to: '/form?uri=vouchers/generate', label: 'Generate Vouchers' } // properties of `<b-button>`
      ]
    }
  }
  const searchFields = {
    distance: {
      type: 'select',
      label: 'Distance de recherche',
      cols: 3,
      options: [
        { text: '1km', value: 1 },
        { text: '5km', value: 5 },
        { text: '15km', value: 15 },
        { text: '30km', value: 30 },
        { text: '50km', value: 50 },
        { text: '75km', value: 75 }
      ]
    }
  }
  try {
    const { page, where, perPage } = JSON.parse(req.query.query || '{}')
    const weekAvailability = (where || {}).weekAvailability || ['morning', 'noon', 'afternoon', 'evening', 'allDay']
    const weekendAvailability = (where || {}).weekendAvailability || ['morning', 'noon', 'afternoon', 'evening', 'allDay']
    const kmDistance = (where || {}).distance || 15
    const distance = 1000 * kmDistance
    const { coordinates } = req.user.preferedVaccinationCenter.location
    const total = await candidatesRepositories.getCount(weekAvailability, weekendAvailability, coordinates, distance)
    const candidates = await candidatesRepositories.getPaginated(page, perPage, weekAvailability, weekendAvailability, coordinates, distance)
    const availabilityMapper = {
      allDay: 'Toute la journée',
      morning: 'Matin',
      noon: 'Midi',
      afternoon: 'Après-Midi',
      evening: 'Soir'
    }
    const data = candidates.map(c => ({
      ...c,
      weekAvailability: availabilityMapper[c.weekAvailability[0]],
      weekendAvailability: availabilityMapper[c.weekendAvailability[0]],
      birthDate: moment(c.birthDate).format('DD-MM-YYYY')
    }))

    res.send({
      fields,
      searchFields,
      total,
      perPage,
      page,
      data
    })
  } catch (err) {
    res.status(400).send(err.message)
  }
})

// POST Routes
router.post('/', async (req, res) => {
  try {
    const response = await candidatesController.createCandidate(req.body)

    res.send(response)
  } catch (err) {
    res.status(400).send(err.message)
  }
})

router.get('/:candidateId/confirm/:tokenId', async (req, res) => {
  try {
    const { candidateId, tokenId } = req.params

    await candidatesController.confirmCandidate(candidateId, tokenId)

    res.redirect(`${process.env.LANDING_PAGE_URL}/success`)
  } catch (err) {
    res.redirect(`${process.env.LANDING_PAGE_URL}/error`)
  }
})

router.delete('/:candidateId', verify, async (req, res) => {
  try {
    const { candidateId } = req.params
    const medicId = req.user._id
    await candidatesController.disableCandidate(candidateId, medicId)
    res.status(204).send('success')
  } catch (err) {
    res.status(400)
  }
})

module.exports = router
