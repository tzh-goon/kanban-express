import Router from 'express-promise-router'
import { getTaskById, createTask, updateTask, deleteTask, getProjectCategoryTasks } from '../../controllers'

const router = Router()
router.post('/task', createTask)
router.get('/task/:id', getTaskById)
router.put('/task/:id', updateTask)
router.delete('/task/:id', deleteTask)

router.get('/project/:projectId/category/:categoryId/tasks', getProjectCategoryTasks)

export default router
