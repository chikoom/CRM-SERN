const express = require('express')
const path = require('path')
const clientRouter = require('./server/routes/clientsAPI')
const workersRouter = require('./server/routes/workersAPI')
const statsRouter = require('./server/routes/statsAPI')
const cors = require('cors')
require('dotenv').config()
const app = express()

const { PORT, CORS_URL } = process.env

var corsOptions = {
  origin: CORS_URL,
}
app.use(cors(corsOptions))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'build')))

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
  res.header(
    'Access-Control-Allow-Headers',
    'Content-Type, Authorization, Content-Length, X-Requested-With'
  )
  next()
})

app.use('/api/clients/', clientRouter)
app.use('/api/workers/', workersRouter)
app.use('/api/stats/', statsRouter)

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

app.listen(PORT, function () {
  console.log(`SERVER UP! :: ${PORT}`)
})
