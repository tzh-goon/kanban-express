import Router from 'express-promise-router'
import {
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  getProjectCaregoryTaskById,
  getProjectCategoryTasksPage,
  getProjectCategoryTasksAll
} from '../../controllers'

const router = Router()

router.get('/task/:id', getTaskById)
// router.post('/task', createTask)
// router.put('/task/:id', updateTask)
// router.delete('/task/:id', deleteTask)

router.post('/project/:projectId/category/:categoryId/task', createTask)
router.get('/project/:projectId/category/:categoryId/task/:id', getProjectCaregoryTaskById)
router.put('/project/:projectId/category/:categoryId/task/:id', updateTask)
router.delete('/project/:projectId/category/:categoryId/task/:id', deleteTask)

router.get('/project/:projectId/category/:categoryId/tasks', getProjectCategoryTasksPage)
router.get('/project/:projectId/category/:categoryId/tasks/all', getProjectCategoryTasksAll)

export default router
