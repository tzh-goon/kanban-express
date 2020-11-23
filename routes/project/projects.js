import { Router } from 'express'
import { sendResp } from '../../utils'
import { getProjectById, createProject, updateProject, deleteProject } from '../../controllers'

const router = Router()
router.post('/project', function (req, res, next) {
  const project = req.body
  createProject(project)
    .then(e => sendResp(res, e))
    .catch(next)
})

router.get('/project/:id', function (req, res, next) {
  const id = req.params.id
  getProjectById(id)
    .then(e => sendResp(res, e))
    .catch(next)
})

router.put('/project/:id', function (req, res, next) {
  const id = req.params.id
  const data = req.body
  updateProject(id, data)
    .then(e => sendResp(res, e))
    .catch(next)
})

router.delete('/project/:id', function (req, res, next) {
  const id = req.params.id
  deleteProject(id)
    .then(e => sendResp(res, e))
    .catch(next)
})

export default router
