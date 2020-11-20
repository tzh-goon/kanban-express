const express = require('express')
const mongoose = require('mongoose')
const logger = require('morgan')
const helmet = require('helmet')
const createError = require('http-errors')
const dbConnect = require('./mongodb/index')

const app = express()
dbConnect()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(logger('tiny'))
app.use(helmet())

app.get('/', (req, res) => {
  res.send('hello !')
})

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
