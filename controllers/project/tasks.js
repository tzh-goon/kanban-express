import { Task, Category } from '@/Models'
import { sendResp } from '@/Utils'

export function addTaskToCategory(categoryId, taskIds, index = 0) {
  return Category.updateOne({ _id: categoryId }, { $push: { tasks: { $each: taskIds, $position: index } } }).exec()
}

function removeTaskFromCategory(categoryId, taskId) {
  return Category.updateOne({ _id: categoryId }, { $pull: { tasks: taskId } }).exec()
}

export async function createTask(req, res, next) {
  const { projectId, categoryId } = req.params
  const owner = req.user.id
  const fields = req.body
  const task = await Task.create({
    ...fields,
    project: projectId,
    category: categoryId,
    owner
  })
  await addTaskToCategory(categoryId, [task.id])
  sendResp(res, task)
}

export async function deleteTask(req, res, next) {
  const id = req.params.id
  const task = await Task.updateOne({ _id: id }, { delete: true })
  if (task) {
    // 从分组中移除
    await removeTaskFromCategory(task.category, id)
  }
  sendResp(res, null)
}

export async function getTaskById(req, res, next) {
  const { id } = req.params
  const task = await Task.findOne({ _id: id, delete: false }).orFail().exec()
  sendResp(res, task)
}

export async function getProjectCaregoryTaskById(req, res, next) {
  const { projectId, categoryId, id } = req.params
  const task = await Task.findOne({ _id: id, project: projectId, category: categoryId, delete: false }).orFail().exec()
  sendResp(res, task)
}

export async function updateTask(req, res, next) {
  const { projectId, categoryId, id } = req.params
  const fields = req.body
  const task = await Task.findOneAndUpdate(
    { _id: id, project: projectId, category: categoryId, delete: false },
    fields,
    { new: true }
  )
    .orFail()
    .exec()
  sendResp(res, task)
}

export async function getProjectCategoryTasksPage(req, res, next) {
  const { projectId, categoryId } = req.params
  const { page, offset, limit } = req.query
  const result = await Task.paginate(
    { project: projectId, category: categoryId, delete: false },
    { page, offset, limit }
  )
  sendResp(res, result)
}

export async function getProjectCategoryTasksAll(req, res, next) {
  const { projectId, categoryId } = req.params
  const result = await Task.find({ project: projectId, category: categoryId, delete: false }).exec()
  sendResp(res, result)
}
