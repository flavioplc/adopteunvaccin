const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', '')
  if (!token) {
    res.status(401).send('Access denied')
  } else {
    try {
      req.user = jwt.verify(token, process.env.TOKEN_SECRET)
      if (!req.user.verified) {
        res.status(401).send('User not verified yet')
      }
      if (!req.user.confirmedAt) {
        res.status(401).send('User not confirmed yet')
      }
      next()
    } catch (err) {
      res.status(401).send('invalid token')
    }
  }
}
