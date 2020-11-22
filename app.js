import express, { json, urlencoded } from 'express'
import logger from 'morgan'
import expressJwt from 'express-jwt'
import CreateHttpError from 'http-errors'
import dbConnect from './mongodb/index'
import router from './routes/index'
import config from './utils/config'

const app = express()
dbConnect()

app.use(json())
app.use(urlencoded({ extended: false }))
app.use(logger('tiny'))
app.use(
  expressJwt({
    secret: config.JWT_SECRET,
    algorithms: ['RS256']
  }).unless({
    path: ['/login', '/signup']
  })
)

router(app)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(new CreateHttpError(404))
})

// error handler
app.use(function (err, req, res, next) {
  console.log('error handler')
  console.log(err)
  console.log(err.name)
  if (err.name === 'UnauthorizedError') {
    res.status(401).send('')
    return
  }
  if (err.name === 'HttpError') {
    res.status(err.status)
    return
  }
  next(new CreateHttpError(500, err))
})

const server = app.listen(config.PORT, function () {
  const port = server.address().port
  console.log('应用实例，访问地址为 http://localhost:%s', port)
})

export default app
