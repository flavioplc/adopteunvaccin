const express = require('express')
const router = express.Router()

const medicController = require('../controllers/medics.controller')
// POST Routes
router.post('/', async (req, res) => {
  try {
    console.log(req.body)
    const response = await medicController.createMedic(req.body)

    res.send(response)
  } catch (err) {
    res.status(400).send(err.message)
  }
})
router.get('/:medicId/confirm/:tokenId', async (req, res) => {
  try {
    const { medicId, tokenId } = req.params

    await medicController.confirmMedic(medicId, tokenId)

    res.redirect(`${process.env.LANDING_PAGE_URL}/success`)
  } catch (err) {
    res.redirect(`${process.env.LANDING_PAGE_URL}/error`)
  }
})

module.exports = router
