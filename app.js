import express, { json, urlencoded } from 'express'
import expressJwt from 'express-jwt'
import swStats from 'swagger-stats'
import expressSwaggerGenerator from 'express-swagger-generator'
import compression from 'compression'
import logger from 'morgan'
import CreateHttpError from 'http-errors'
import dbConnect from './mongodb/index'
import router from '@/Routes'
import { config, sendErrorResp } from '@/Utils'

dbConnect()

const app = express()

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      description: 'This is a sample server',
      title: 'Swagger',
      version: '1.0.0'
    },
    host: `localhost:${config.PORT}`,
    basePath: '/services',
    produces: ['application/json', 'application/xml'],
    schemes: ['http', 'https'],
    securityDefinitions: {
      JWT: {
        type: 'apiKey',
        in: 'header',
        name: 'Authorization',
        description: ''
      }
    }
  },
  route: {
    url: '/swagger',
    docs: '/swagger.json' // swagger文件 api
  },
  basedir: __dirname, // app absolute path
  files: ['./models/**/*.js', './controllers/**/*.js'] // Path to the API handle folder
}
expressSwaggerGenerator(app)(swaggerOptions)

app.use(swStats.getMiddleware({}))

app.use(json())
app.use(urlencoded({ extended: false }))
app.use(logger('tiny'))
app.use(compression())
app.use(
  expressJwt({
    secret: config.JWT_SECRET,
    algorithms: ['HS256']
  }).unless({
    path: [/\/services\/login/, /\/api-docs/, /\/swagger-stats/]
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
  const error = new CreateHttpError(err.statusCode || 400, err)
  sendErrorResp(res, error.statusCode, null, error.message)
})

app.listen(config.PORT)

export default app
