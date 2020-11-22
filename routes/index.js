import userRouter from './user'

export default function (app) {
  app.use('/services', userRouter)
}
