const config = {
  PORT: process.env.PORT || 3001,
  DB_CONNECTION: process.env.DB_CONNECTION || 'mongodb://localhost/adopteunvaccin',
  TOKEN_SECRET: process.env.TOKEN_SECRET,
  LANDING_PAGE_URL: process.env.LANDING_PAGE_URL
}

if (!config.DB_CONNECTION) {
  console.error('No Mongo database specified!')
  process.exit()
}

module.exports = config
