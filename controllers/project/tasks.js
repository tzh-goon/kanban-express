import { Task } from '../../models'

export function createTask(task) {
  return Task.create(task)
}

export function getTaskById(id) {
  return Task.findById(id).exec()
}

export function updateTask(id, fields) {
  return Task.findByIdAndUpdate(id, fields, { new: true }).exec()
}

export function deleteTask(id) {
  return Task.findByIdAndDelete(id).exec()
}

export function getAllTasks() {
  return Task.find({}).exec()
}
