const routes = require('../routes')
const verify = require('../middlewares/verifyToken')
const medicsController = require('../controllers/medics.controller')

module.exports = (server) => {
  Object.entries(routes).forEach(([name, file]) => {
    server.use(`/${name}`, file)
  })

  // Welcome route
  server.get('/', (req, res) => {
    res.send('Welcome Adopte un vaccin API !')
  })
  server.get('/site', (req, res) =>
    res.send({
      name: 'Adopteunvaccin', // site name
      locale: 'fr-FR',
      locale_switcher: false,
      theme_switcher: false,
      theme: 'cosmo',
      url: 'https://app.adopteunvaccin.fr/',
      grid_style: 1,
      footer1: '',
      css: [`${req.protocol}://${req.hostname}/static/custom.css`],
      menu: [
        // site menu
        {
          name: 'Home',
          url: '/home',
          exact: true,
          icon: 'icon-home'
        },
        {
          name: 'Candidats',
          url: '/rest/candidates',
          icon: 'icon-user'
        },
        {
          divider: true
        },
        {
          name: 'Logout',
          url: '/login',
          icon: 'icon-lock'
        }
      ]
    })
  )
  server.get('/home', verify, (req, res) => {
    res.send({
      title: 'Bienvenue sur le back-office de adopteunvaccin.fr',
      button: {
        icon: 'icon-people',
        variant: 'primary',
        text: 'Candidats pour la vaccination',
        to: '/rest/candidates'
      }
    })
  })
  server.post('/login', async (req, res) => {
    const { email, rpps, password } = req.body
    const token = await medicsController.medicLogin({ email, rpps, password })
    if (token) {
      res.send({
        user: { email, rpps },
        token
      })
    } else {
      res.status(422).send({
        message: 'Username or password is incorrect.'
      })
    }
  })
}
