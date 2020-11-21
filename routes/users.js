const express = require('express')
const users = require('../controllers/users')
const router = express.Router()

router.get('/user/:id', function (req, res, next) {
  const id = req.params.id
  users
    .getUserById(id)
    .then(e => res.json(e))
    .catch(next)
})

router.post('/user', function (req, res, next) {
  const user = req.body
  users
    .createUser(user)
    .then(e => res.json(e))
    .catch(next)
})

router.put('/user/:id', function (req, res, next) {
  const id = req.params.id
  const data = req.body
  users
    .updateUser(id, data)
    .then(e => res.json(e))
    .catch(next)
})

router.delete('/user/:id', function (req, res, next) {
  const id = req.params.id
  users
    .deleteUser(id)
    .then(e => res.json(e))
    .catch(next)
})

router.get('/users/all', function (req, res, next) {
  users
    .getAllUsers()
    .then(e => res.json(e))
    .catch(next)
})

module.exports = router
