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

const Country = sequelize.define(
  'Coutry',
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    timestamps: false,
  }
)

const Worker = sequelize.define(
  'Worker',
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    firstName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    lastName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    phone: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
)

const Client = sequelize.define(
  'Client',
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    firstName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    lastName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    phone: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    sold: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
    },
    country: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: { model: 'Coutries', key: 'id' },
    },
    worker: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: { model: 'Workers', key: 'id' },
    },
  },
  {
    timestamps: false,
  }
)

sequelize.sync()
