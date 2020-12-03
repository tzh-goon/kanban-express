import { Category, Project, Task } from '@/Models'
import { sendResp } from '@/Utils'
import { initProject } from './init'

export async function createProject(req, res, next) {
  const fields = req.body
  const project = await Project.create(fields)
  sendResp(res, project)
}

export async function getProjectById(req, res, next) {
  const id = req.params.id
  const project = await Project.findById(id).exec()
  sendResp(res, project)
}

export async function updateProject(req, res, next) {
  const id = req.params.id
  const fields = req.body
  const project = await Project.findByIdAndUpdate(id, fields, { new: true }).exec()
  sendResp(res, project)
}

export async function getMyProject(req, res, next) {
  const userId = req.user.id
  // 初始化项目
  await initProject(userId)
  // 查询项目
  const project = await Project.findOne({ owner: userId, delete: false }) //
    .orFail()
    .populate({
      path: 'categories',
      select: '_id title'
    })
  sendResp(res, project)
}

export async function getMyProjectAll(req, res, next) {
  const userId = req.user.id
  // 初始化项目
  await initProject(userId)
  // 查询项目
  const project = await Project.findOne({ owner: userId, delete: false }) //
    .orFail()
    .populate({
      path: 'categories',
      select: '_id title',
      populate: {
        path: 'tasks'
      }
    })
  sendResp(res, project)
}

/**
 * 删除项目及其关联
 */
export async function deleteProject(req, res, next) {
  const id = req.params.id
  // 删除任务
  await Task.update({ project: id }, { delete: true })
  // 删除分类
  await Category.update({ project: id }, { delete: true })
  // 删除项目
  await Project.update({ _id: id }, { delete: true })
  sendResp(res, null)
}
