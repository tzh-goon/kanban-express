const express = require('express')
const router = express.Router()
router.use(require('./users'))

module.exports = function (app) {
  app.use('/services', router)
}
