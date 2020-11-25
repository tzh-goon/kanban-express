import { Router } from 'express'
import { getProjectById, createProject, updateProject, deleteProject } from '../../controllers'

const router = Router()
router.post('/project', createProject)
router.get('/project/:id', getProjectById)
router.put('/project/:id', updateProject)
router.delete('/project/:id', deleteProject)

export default router
