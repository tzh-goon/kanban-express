const express = require('express')
const users = require('../controllers/users')
const router = express.Router()

router.get('/user/:id', function (req, res, next) {
  const id = req.params.id
  users.getUserById(id).then(res.json).catch(next)
})

router.post('/user', function (req, res, next) {
  const user = req.body
  users.createUser(user).then(res.json).catch(next)
})

router.put('/user/:id', function (req, res, next) {
  const id = req.params.id
  const data = req.body
  users.updateUser(id, data).then(res.json).catch(next)
})

router.delete('/user/:id', function (req, res, next) {
  const id = req.params.id
  users.deleteUser(id).then(res.json).catch(next)
})

router.get('/users/all', function (req, res, next) {
  console.log('all???')
  users.getAllUsers().then(res.json).catch(next)
})

module.exports = router
