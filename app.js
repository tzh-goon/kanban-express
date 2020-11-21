const express = require('express')
const logger = require('morgan')
const helmet = require('helmet')
const CreateError = require('http-errors')
const config = require('config-lite')({
  config_basedir: __dirname,
  config_dir: 'config'
})
const dbConnect = require('./mongodb/index')
const router = require('./routes/index')

const app = express()
dbConnect()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(logger('tiny'))
app.use(helmet())

app.get('/', (req, res) => {
  res.send('hello !')
})

router(app)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(new CreateError(404))
})

// error handler
app.use(function (err, req, res, next) {
  console.log(err)
  next(new CreateError(500))
})

const server = app.listen(config.port, function () {
  const port = server.address().port
  console.log('应用实例，访问地址为 http://localhost:%s', port)
})

module.exports = app
