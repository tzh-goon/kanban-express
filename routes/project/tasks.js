import { Router } from 'express'
import { getTaskById, createTask, updateTask, deleteTask } from '../../controllers'

const router = Router()
router.post('/task', createTask)
router.get('/task/:id', getTaskById)
router.put('/task/:id', updateTask)
router.delete('/task/:id', deleteTask)

export default router
