const Sequelize = require('sequelize')
require('dotenv').config()
const { DB_USER, DB_PASS, DB_NAME, DB_URL, DB_PORT } = process.env
const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  host: DB_URL,
  port: DB_PORT,
  logging: console.log,
  maxConcurrentQueries: 100,
  dialect: 'mysql',
  dialectOptions: {
    ssl: 'Amazon RDS',
  },
  pool: { maxConnections: 5, maxIdleTime: 30 },
  language: 'en',
})
module.exports = sequelize
