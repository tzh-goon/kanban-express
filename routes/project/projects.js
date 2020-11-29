import Router from 'express-promise-router'
import { getMyProject, getProjectById, createProject, updateProject, deleteProject } from '@/Controllers'

const router = Router()

router.get('/project/my', getMyProject)

router.post('/project', createProject)
router.get('/project/:id', getProjectById)
router.put('/project/:id', updateProject)
router.delete('/project/:id', deleteProject)

export default router
