import { Router } from 'express'
import { getUserById, createUser, updateUser, deleteUser, getAllUsers } from '../controllers/users'
const router = Router()

router.get('/user/:id', function (req, res, next) {
  const id = req.params.id
  getUserById(id)
    .then(e => res.json(e))
    .catch(next)
})

router.post('/user', function (req, res, next) {
  const user = req.body
  createUser(user)
    .then(e => res.json(e))
    .catch(next)
})

router.put('/user/:id', function (req, res, next) {
  const id = req.params.id
  const data = req.body
  updateUser(id, data)
    .then(e => res.json(e))
    .catch(next)
})

router.delete('/user/:id', function (req, res, next) {
  const id = req.params.id
  deleteUser(id)
    .then(e => res.json(e))
    .catch(next)
})

router.get('/users/all', function (req, res, next) {
  getAllUsers()
    .then(e => res.json(e))
    .catch(next)
})

export default router
