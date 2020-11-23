import { Router } from 'express'
import { sendResp } from '../../utils'
import { getTaskById, createTask, updateTask, deleteTask } from '../../controllers'

const router = Router()
router.post('project/:project/category/:category/task', function (req, res, next) {
  const task = req.body
  createTask(task)
    .then(e => sendResp(res, e))
    .catch(next)
})

router.get('/task/:id', function (req, res, next) {
  const id = req.params.id
  getTaskById(id)
    .then(e => sendResp(res, e))
    .catch(next)
})

router.put('/task/:id', function (req, res, next) {
  const id = req.params.id
  const data = req.body
  updateTask(id, data)
    .then(e => sendResp(res, e))
    .catch(next)
})

router.delete('/task/:id', function (req, res, next) {
  const id = req.params.id
  deleteTask(id)
    .then(e => sendResp(res, e))
    .catch(next)
})

const parentRouter = Router()
parentRouter.use('/project/:projectId/category/:categoryId', router)

export default parentRouter
