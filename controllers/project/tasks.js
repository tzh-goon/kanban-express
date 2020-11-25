import assert from 'assert'
import { sendResp } from '../../utils'
import { Task, Category } from '../../models'

function addTaskToCategory(taskId, categoryId) {
  return Category.updateOne(
    { _id: categoryId },
    {
      $push: { tasks: { $each: [taskId], $position: 0 } }
    }
  ).exec()
}

function removeTaskFromCategory(taskId, categoryId) {
  return Category.updateOne(
    { _id: categoryId },
    {
      $pull: { tasks: taskId }
    }
  ).exec()
}

export async function createTask(req, res, next) {
  const fields = req.body
  assert.ok(!!fields.project, 'project 不能为空')
  assert.ok(!!fields.category, 'category 不能为空')
  const task = await Task.create(fields)
  await addTaskToCategory(task.id, task.category)
  sendResp(res, task)
}

export async function deleteTask(req, res, next) {
  const id = req.params.id
  const task = await Task.updateOne({ _id: id }, { delete: true })
  await removeTaskFromCategory(id, task.category)
  sendResp(res, null)
}

export async function getTaskById(req, res, next) {
  const id = req.params.id
  const task = await Task.findById(id).exec()
  sendResp(res, task)
}

export async function updateTask(req, res, next) {
  const id = req.params.id
  const fields = req.body
  const task = await Task.findByIdAndUpdate(id, fields, { new: true }).exec()
  sendResp(res, task)
}
