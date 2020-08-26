const faker = require('faker')
const Sequelize = require('sequelize')
const countries = require('./countries')
const clientLevels = require('./clientLevels')
const phoneNumbers = require('./phoneNumbers')
const workerImages = require('./workerImages')
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

console.log('FAKE')

const getRendomAmount = () => {
  return (Math.floor(Math.random() * 1000) + 1) * -1
}

const createSingleClient = () => {
  let phone = faker.phone.phoneNumber()
  phone = phone.replace('.', '-')
  phone = phone.replace('.', '-')
  phone = phone.replace('.', '-')
  phone = phone.substring(0, phone.indexOf(' x'))
  const firstName = faker.name.firstName()
  const lastName = faker.name.lastName()
  return {
    firstName: firstName,
    lastName: lastName,
    email: `${firstName}.${lastName}@gmail.com`,
    phone: phone,
    sold: false,
    level: Math.floor(Math.random() * 3) + 1,
    country: Math.floor(Math.random() * 240) + 1,
    worker: Math.floor(Math.random() * 10) + 1,
  }
}

const seedClients = async number => {
  for (let i = 0; i < number; i++) {
    const {
      firstName,
      lastName,
      email,
      phone,
      sold,
      level,
      country,
      worker,
    } = createSingleClient()
    const [queryResult, metadata] = await sequelize.query(
      `INSERT INTO Clients VALUES(null, '${firstName}', '${lastName}', '${email}', '${phone}', '${sold}', '${level}','${country}','${worker}' )`
    )
    console.log(queryResult)
  }
}

const createSingleWorker = index => {
  return {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    phone: phoneNumbers[index],
    imageURL: workerImages[index],
  }
}

const seedWorkers = async number => {
  for (let i = 0; i < number; i++) {
    const { firstName, lastName, email, phone, imageURL } = createSingleWorker(
      i
    )
    const [queryResult, metadata] = await sequelize.query(
      `INSERT INTO Workers VALUES(null, '${firstName}', '${lastName}', '${email}', '${phone}', '${imageURL}')`
    )
    console.log(queryResult)
  }
}

const seedCountries = async countries => {
  for (let country of countries) {
    const [queryResult, metadata] = await sequelize.query(
      `INSERT INTO Countries VALUES(null, '${country.name}', '${country.code}')`
    )
    console.log(queryResult)
  }
}

const seedClientLevels = async () => {
  for (let level of clientLevels) {
    const [queryResult, metadata] = await sequelize.query(
      `INSERT INTO ClientLevels VALUES(null, '${level.name}', '${level.email}')`
    )
    console.log(queryResult)
  }
}

const seed = async () => {
  // await seedCountries(countries)
  // await seedClientLevels()
  // await seedWorkers(10)
  await seedClients(30)
}

seed()
