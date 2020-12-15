import { Task, Category } from '@/Models'
import { sendResp } from '@/Utils'
import _ from 'lodash'

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
  const { projectId, categoryId, id } = req.params
  const task = await Task.updateOne({ _id: id, project: projectId, category: categoryId }, { delete: true })
  if (task) {
    // 从分组中移除
    await removeTaskFromCategory(task.category, id)
  }
  sendResp(res, null)
}

export async function getTaskById(req, res, next) {
  const { id } = req.params
  const task = await Task.findOne({ _id: id, delete: false }) //
    .orFail(new Error('Task not Found'))
    .exec()
  sendResp(res, task)
}

export async function updateTask(req, res, next) {
  const { projectId, categoryId, id } = req.params
  const fields = req.body
  const task = await Task.findOneAndUpdate({ _id: id, project: projectId, category: categoryId }, fields, { new: true })
    .orFail(new Error('Task not Found'))
    .exec()
  sendResp(res, task)
}

export async function finishTask(req, res, next) {
  const { projectId, categoryId, id } = req.params
  const task = await Task.findOneAndUpdate({ _id: id }, { finish: true, finishTime: Date.now() }, { new: true }).exec()

  // 完成任务时，移动到分组下最后一个未完成的位置
  const category = await getProjectCategoryTasksWithFinishState(projectId, categoryId)
  const insertIndex = _.findLastIndex(category.tasks, e => !e.finish) + 1
  await Category.updateOne({ _id: categoryId }, { $pull: { tasks: id } }).exec()
  await Category.updateOne({ _id: categoryId }, { $push: { tasks: { $each: [id], $position: insertIndex } } }).exec()

  sendResp(res, task)
}

export async function undoTask(req, res, next) {
  const { categoryId, id } = req.params
  const task = await Task.findOneAndUpdate({ _id: id }, { finish: false, finishTime: null }, { new: true }).exec()

  // 重做任务时，移到分组下第一个
  await Category.updateOne({ _id: categoryId }, { $pull: { tasks: id } }).exec()
  await Category.updateOne({ _id: categoryId }, { $push: { tasks: { $each: [id], $position: 0 } } }).exec()

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

export function getProjectCategoryTasksWithFinishState(projectId, categoryId) {
  return Category.findOne({ _id: categoryId, project: projectId })
    .orFail(new Error('Category Not Found'))
    .populate({
      path: 'tasks',
      select: '_id finish'
    })
    .exec()
}

export async function setProjectCategoryTasksOrder(projectId, categoryId) {
  const category = await getProjectCategoryTasksWithFinishState(projectId, categoryId)
  const tasks = category.tasks
  // 分类排序
  const unfinishedIds = tasks.filter(e => !e.finish).map(e => e._id)
  const finishedIds = tasks.filter(e => e.finish).map(e => e._id)
  const newIds = [...unfinishedIds, ...finishedIds]
  await Category.updateOne({ _id: categoryId }, { tasks: newIds }).exec()
}
