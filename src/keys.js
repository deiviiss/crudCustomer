if (process.env.NODE_ENV != 'production') {
  require('dotenv').config();
}

module.exports = {
  database: {
    host: process.env.CLEVER_HOST,
    user: process.env.CLEVER_USER,
    password: process.env.CLEVER_PASSWORD,
    port: process.env.CLEVER_PORT,
    database: process.env.CLEVER_DATABASE
  }
}