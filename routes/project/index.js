import Router from 'express-promise-router'
import userRouter from './user'
import usersRouter from './users'
import loginRouter from './login'

const router = Router()
router.use('/user', userRouter)
router.use('/users', usersRouter)
router.use('/login', loginRouter)

export default router
