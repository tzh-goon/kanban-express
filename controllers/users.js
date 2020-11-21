const { User } = require('../models/index')

module.exports.createUser = function (user) {
  return User.create(user)
}

module.exports.getUserById = function (id) {
  return User.findById(id).exec()
}

module.exports.updateUser = function (id, fields) {
  return User.findByIdAndUpdate(id, fields, { new: true }).exec()
}

module.exports.deleteUser = function (id) {
  return User.findByIdAndDelete(id).exec()
}

module.exports.getAllUsers = function () {
  return User.find({}).exec()
}
