const express = require('express')
const QueryHelpers = require('./helpers/QueryHelpers')
const statsRouter = express.Router()

statsRouter.get('/', async (req, res) => {
  try {
    res.status(200).send('OK')
  } catch (error) {
    console.error(error)
    res
      .status(500)
      .send({ error: 'Query Error', msg: error.original.sqlMessage })
  }
})

module.exports = statsRouter
