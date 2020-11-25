import { Category, Project, Task } from '../../models'
import { sendResp } from '../../utils'

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

export async function getProjectByUserId(req, res, next) {
  const ownerId = req.user.id
  const project = await Project.findOne({ ownerId }) //
    .populate({
      path: 'categories',
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
