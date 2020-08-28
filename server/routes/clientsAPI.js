const express = require('express')
const QueryHelpers = require('./helpers/QueryHelpers')
const clientsRouter = express.Router()

clientsRouter.get('/', async (req, res) => {
  try {
    const result = await QueryHelpers.getBySearchQuery(req.query, 'Clients')
    const total = await QueryHelpers.getTotalNumberOf('Clients')
    res.status(200).send({ clients: result[0], total: total[0][0].total })
  } catch (error) {
    console.error(error)
    res
      .status(500)
      .send({ error: 'Query Error', msg: error.original.sqlMessage })
  }
})

clientsRouter.get('/:id', async (req, res) => {
  const { id } = req.params
  try {
    const result = await QueryHelpers.getClientById(id)
    res.status(200).send(result)
  } catch (error) {
    console.error(error)
    res
      .status(500)
      .send({ error: 'Query Error', msg: error.original.sqlMessage })
  }
})

clientsRouter.post('/new', async (req, res) => {
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

clientsRouter.put('/:id', async (req, res) => {
  const { id } = req.params
  const fields = { ...req.body }
  try {
    const result = QueryHelpers.updateEntityByID(id, 'Clients', fields)
    const updatedUser = await QueryHelpers.getClientById(id)
    res.status(result ? 200 : 404)
    res.send(updatedUser)
  } catch (error) {
    console.error(error)
    res
      .status(500)
      .send({ error: 'Query Error', msg: error.original.sqlMessage })
  }
})

clientsRouter.delete('/:id', async (req, res) => {
  const { id } = req.params
  try {
    const result = await QueryHelpers.deleteEntityByID(id, 'Clients')
    res.status(result ? 204 : 404).end()
  } catch (error) {
    console.error(error)
    res
      .status(500)
      .send({ error: 'Query Error', msg: error.original.sqlMessage })
  }
})

module.exports = clientsRouter
