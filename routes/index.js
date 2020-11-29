import { tokenSupplyHandler } from '@/Utils'
import userRouter from './user'
import projectRouter from './project'

export default function (app) {
  app.use('/services', [tokenSupplyHandler, userRouter, projectRouter])
}
