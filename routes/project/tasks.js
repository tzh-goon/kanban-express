import Router from 'express-promise-router'
import {
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  getProjectCategoryTasksPage,
  getProjectCategoryTasksAll
} from '../../controllers'

const router = Router()
router.post('/task', createTask)
router.get('/task/:id', getTaskById)
router.put('/task/:id', updateTask)
router.delete('/task/:id', deleteTask)

router.get('/project/:projectId/category/:categoryId/tasks', getProjectCategoryTasksPage)
router.get('/project/:projectId/category/:categoryId/tasks/all', getProjectCategoryTasksAll)

export default router
