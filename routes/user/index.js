import Router from 'express-promise-router'
import userRouter from './user'
import loginRouter from './login'

const router = Router()
router.use('/user', userRouter)
router.use('/login', loginRouter)

export default router
