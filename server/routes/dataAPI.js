const express = require('express')
const QueryHelpers = require('./helpers/QueryHelpers')
const dataRouter = express.Router()

dataRouter.get('/countries', async (req, res) => {
  try {
    const result = await QueryHelpers.getAllCountries()
    res.status(200).send(result)
  } catch (error) {
    console.error(error)
    res
      .status(500)
      .send({ error: 'Query Error', msg: error.original.sqlMessage })
  }
})

dataRouter.get('/levels', async (req, res) => {
  try {
    const result = await QueryHelpers.getAllLevels()
    res.status(200).send(result)
  } catch (error) {
    console.error(error)
    res
      .status(500)
      .send({ error: 'Query Error', msg: error.original.sqlMessage })
  }
})

module.exports = dataRouter
