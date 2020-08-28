const express = require('express')
const QueryHelpers = require('./helpers/QueryHelpers')
const statsRouter = express.Router()

statsRouter.get('/clients/sum/levels', async (req, res) => {
  try {
    const result = await QueryHelpers.getClientsSumByLevel()
    res.status(200).send(result)
  } catch (error) {
    console.error(error)
    res
      .status(500)
      .send({ error: 'Query Error', msg: error.original.sqlMessage })
  }
})

statsRouter.get('/clients/sum/workers', async (req, res) => {
  const { levels } = req.query
  try {
    const result = await QueryHelpers.getClientsSumByWorker(levels)
    res.status(200).send(result)
  } catch (error) {
    console.error(error)
    res
      .status(500)
      .send({ error: 'Query Error', msg: error.original.sqlMessage })
  }
})

statsRouter.get('/newclients/sum/month', async (req, res) => {
  try {
    const result = await QueryHelpers.getNewClientsSumByMonth()
    res.status(200).send(result)
  } catch (error) {
    console.error(error)
    res
      .status(500)
      .send({ error: 'Query Error', msg: error.original.sqlMessage })
  }
})

statsRouter.get('/sales/sum/workers', async (req, res) => {
  try {
    const result = await QueryHelpers.getSalesSumByWorker()
    res.status(200).send(result)
  } catch (error) {
    console.error(error)
    res
      .status(500)
      .send({ error: 'Query Error', msg: error.original.sqlMessage })
  }
})

statsRouter.get('/daterange/sum/workers', async (req, res) => {
  const { field, from, until } = req.query
  try {
    const result = await QueryHelpers.getSalesDatesByWorker(field, from, until)
    res.status(200).send(result)
  } catch (error) {
    console.error(error)
    res
      .status(500)
      .send({ error: 'Query Error', msg: error.original.sqlMessage })
  }
})

statsRouter.get('/sales/sum/countries', async (req, res) => {
  try {
    const result = await QueryHelpers.getSalesSumByCountry()
    res.status(200).send(result)
  } catch (error) {
    console.error(error)
    res
      .status(500)
      .send({ error: 'Query Error', msg: error.original.sqlMessage })
  }
})

statsRouter.get('/sales/sum/date', async (req, res) => {
  try {
    const result = await QueryHelpers.getSalesSumByDate()
    res.status(200).send(result)
  } catch (error) {
    console.error(error)
    res
      .status(500)
      .send({ error: 'Query Error', msg: error.original.sqlMessage })
  }
})

statsRouter.get('/sales/sum/month', async (req, res) => {
  try {
    const result = await QueryHelpers.getSalesSumByMonth()
    res.status(200).send(result)
  } catch (error) {
    console.error(error)
    res
      .status(500)
      .send({ error: 'Query Error', msg: error.original.sqlMessage })
  }
})

statsRouter.get('/daterange/sum/', async (req, res) => {
  const { field, from, until } = req.query
  try {
    const result = await QueryHelpers.getByDateRange(field, from, until)
    res.status(200).send(result)
  } catch (error) {
    console.error(error)
    res
      .status(500)
      .send({ error: 'Query Error', msg: error.original.sqlMessage })
  }
})

module.exports = statsRouter
