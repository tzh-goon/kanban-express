import { Router } from 'express'
import { sendResp } from '../../utils'
import { getUserById, createUser, updateUser, deleteUser } from '../../controllers'

const router = Router()
router.post('/', function (req, res, next) {
  const user = req.body
  createUser(user)
    .then(e => sendResp(res, e))
    .catch(next)
})

router.get('/:id', function (req, res, next) {
  const id = req.params.id
  getUserById(id)
    .then(e => sendResp(res, e))
    .catch(next)
})

router.put('/:id', function (req, res, next) {
  const id = req.params.id
  const data = req.body
  updateUser(id, data)
    .then(e => sendResp(res, e))
    .catch(next)
})

router.delete('/:id', function (req, res, next) {
  const id = req.params.id
  deleteUser(id)
    .then(e => sendResp(res, e))
    .catch(next)
})

export default router
