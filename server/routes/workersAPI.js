const express = require('express')
const QueryHelpers = require('./helpers/QueryHelpers')
const workersRouter = express.Router()

workersRouter.get('/', async (req, res) => {
  try {
    const result = await QueryHelpers.getBySearchQuery(req.query, 'Workers')
    const total = await QueryHelpers.getTotalNumberOf('Workers')
    res.status(200).send({ workers: result[0], total: total[0][0].total })
  } catch (error) {
    console.error(error)
    res
      .status(500)
      .send({ error: 'Query Error', msg: error.original.sqlMessage })
  }
})

workersRouter.get('/:id', async (req, res) => {
  const { id } = req.params
  try {
    const result = await QueryHelpers.getWorkerById(id)
    res.status(200).send(result)
  } catch (error) {
    console.error(error)
    res
      .status(500)
      .send({ error: 'Query Error', msg: error.original.sqlMessage })
  }
})

workersRouter.post('/new', async (req, res) => {
  try {
    await QueryHelpers.insertNewClient(req.body)
    const result = QueryHelpers.getLastEnteredUser()
    res.status(201).send(result)
  } catch (error) {
    console.error(error)
    res
      .status(500)
      .send({ error: 'Query Error', msg: error.original.sqlMessage })
  }
})

workersRouter.put('/:id', async (req, res) => {
  const { id } = req.params
  const fields = { ...req.body }
  try {
    const result = QueryHelpers.updateEntityByID(id, 'Workers', fields)
    const updatedWorker = await QueryHelpers.getWorkerById(id)
    res.status(result ? 200 : 404)
    res.send(updatedWorker)
  } catch (error) {
    console.error(error)
    res
      .status(500)
      .send({ error: 'Query Error', msg: error.original.sqlMessage })
  }
})

workersRouter.delete('/:id', async (req, res) => {
  const { id } = req.params
  try {
    const result = await QueryHelpers.deleteEntityByID(id, 'Workers')
    res.status(result ? 204 : 404).end()
  } catch (error) {
    console.error(error)
    res
      .status(500)
      .send({ error: 'Query Error', msg: error.original.sqlMessage })
  }
})

module.exports = workersRouter
