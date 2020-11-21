import express, { json, urlencoded } from 'express'
import logger from 'morgan'
import expressJwt from 'express-jwt'
import CreateError from 'http-errors'
import configLite from 'config-lite'
import dbConnect from './mongodb/index'
import router from './routes/index'

const config = configLite({
  config_basedir: __dirname,
  config_dir: 'config'
})

const app = express()
dbConnect()

app.use(json())
app.use(urlencoded({ extended: false }))
app.use(logger('tiny'))
app.use(
  expressJwt({
    secret: config.jwt.secret,
    algorithms: ['RS256']
  }).unless({
    path: ['/login', '/signup']
  })
)

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

export default app
