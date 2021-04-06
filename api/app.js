require('dotenv/config')

const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const initRoutes = require('./server-utils/init-routes')
const server = express()

const config = require('./node.config.js')

server.use(cors())
server.use(bodyParser.json())

server.use(bodyParser.urlencoded({
  extended: true
}))

initRoutes(server)

try {
  mongoose.connect(config.DB_CONNECTION,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    },
    () => {
      console.log('Mongoose is connected')
    })
} catch (err) {
  console.error(err)
};

server.listen(config.PORT)
console.log(`API is running on port ${config.PORT}`)
