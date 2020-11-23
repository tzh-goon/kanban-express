import express, { json, urlencoded } from 'express'
import logger from 'morgan'
import compression from 'compression'
import expressJwt from 'express-jwt'
import CreateHttpError from 'http-errors'
import dbConnect from './mongodb/index'
import router from './routes/index'
import { config, sendErrorResp } from './utils'

const app = express()
dbConnect()

app.use(json())
app.use(urlencoded({ extended: false }))
app.use(logger('tiny'))
app.use(compression())
app.use(
  expressJwt({
    secret: config.JWT_SECRET,
    algorithms: ['HS256']
  }).unless({
    path: [/\/services\/login/]
  })
)

router(app)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(new CreateHttpError(404))
})

// error handler
app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    sendErrorResp(res, 401, '100001', '未授权')
    return
  }
  const error = new CreateHttpError(err.statusCode || 500, err)
  sendErrorResp(res, error.statusCode, '100002', error.message)
})

const server = app.listen(config.PORT, function () {
  const port = server.address().port
  console.log('应用实例，访问地址为 http://localhost:%s', port)
})

export default app
