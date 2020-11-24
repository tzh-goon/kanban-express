import assert from 'assert'
import { Router } from 'express'
import { sendResp } from '../../utils'
import { getTaskById, createTask, updateTask, deleteTask } from '../../controllers'

const router = Router()
router.post('/task', function (req, res, next) {
  const fields = req.body
  assert.ok(!!fields.project, 'project 不能为空')
  assert.ok(!!fields.category, 'category 不能为空')
  createTask(fields)
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

export default router
