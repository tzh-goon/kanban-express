import { Router } from 'express'
import { tokenSupplyHandler } from '@/Utils'
import userRouter from './user'

export default function (app) {
  const router = Router()
  router.use(tokenSupplyHandler)
  router.use(userRouter)

  app.use('/services', router)
}
