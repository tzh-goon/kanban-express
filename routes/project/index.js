import Router from 'express-promise-router'
import projectRouter from './projects'
import categoryRouter from './categories'
import taskRouter from './tasks'

const router = Router()
router.use('/', projectRouter)
router.use('/', categoryRouter)
router.use('/', taskRouter)

export default router
