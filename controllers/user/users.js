import { User } from '../../models'

export function createUser(user) {
  return User.create(user)
}

export function getUserById(id) {
  return User.findById(id).exec()
}

export function updateUser(id, fields) {
  return User.findByIdAndUpdate(id, fields, { new: true }).exec()
}

export function deleteUser(id) {
  return User.findByIdAndDelete(id).exec()
}

export function getAllUsers() {
  return User.find({}).exec()
}
