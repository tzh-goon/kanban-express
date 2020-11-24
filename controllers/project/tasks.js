import { Task, Category } from '../../models'

export function addTaskToCategory(taskId, categoryId) {
  return Category.updateOne(
    { _id: categoryId },
    {
      $push: { tasks: { $each: [taskId], $position: 0 } }
    }
  ).exec()
}

export function removeTaskFromCategory(taskId, categoryId) {
  return Category.updateOne(
    { _id: categoryId },
    {
      $pull: { tasks: taskId }
    }
  ).exec()
}

export async function createTask(fields) {
  const task = await Task.create(fields)
  await addTaskToCategory(task.id, task.category)
  return task
}

export async function deleteTask(id) {
  const task = await Task.updateOne({ _id: id }, { delete: true })
  await removeTaskFromCategory(id, task.category)
}

export function getTaskById(id) {
  return Task.findById(id).exec()
}

export function updateTask(id, fields) {
  return Task.findByIdAndUpdate(id, fields, { new: true }).exec()
}

export function getAllTasks() {
  return Task.find({}).exec()
}
