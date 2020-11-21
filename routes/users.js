const express = require('express')
const User = require('../models/common/User')
const router = express.Router()

router.get('/user/:id', function (req, res, next) {
  const id = req.params.id
  User.findById(id, (err, doc) => {
    if (err) next(err)
    else res.json(doc)
  })
})

router.post('/user', function (req, res, next) {
  const user = req.body
  User.create(user, (err, doc) => {
    if (err) next(err)
    else res.json(doc)
  })
})

router.put('/user/:id', function (req, res, next) {
  const id = req.params.id
  const data = req.body
  User.findByIdAndUpdate(id, data, { new: true }, (err, doc) => {
    if (err) next(err)
    else res.json(doc)
  })
})

router.delete('/user/:id', function (req, res, next) {
  const id = req.params.id
  User.findByIdAndDelete(id, (err, doc) => {
    if (err) next(err)
    else res.json(doc)
  })
})

router.get('/users/all', function (req, res, next) {
  User.find({}, (err, doc) => {
    if (err) next(err)
    else res.json(doc)
  })
})

module.exports = router
