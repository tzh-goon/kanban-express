import { Router } from 'express'
import users from './users'

const router = Router()
router.use(users)

export default function (app) {
  app.use('/services', router)
}
