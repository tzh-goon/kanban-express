const express = require('express')
const mongoose = require('mongoose')
const logger = require('morgan')
const helmet = require('helmet')
const createError = require('http-errors')
const dbConnect = require('./mongodb/index')
const config = require('config-lite')({
  config_basedir: __dirname,
  config_dir: 'config'
})
const router = require('./routes/index')

const app = express()
dbConnect()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(logger('tiny'))
// app.use(helmet())

app.get('/', (req, res) => {
  res.send('hello !')
})

router(app)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(new createError.NotFound())
})

// error handler
app.use(function (err, req, res, next) {
  next(new createError(500));
})

const server = app.listen(config.port, function () {
  const port = server.address().port
  console.log('应用实例，访问地址为 http://localhost:%s', port)
})

module.exports = app
