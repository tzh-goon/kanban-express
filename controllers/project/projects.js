import { Category, Project, Task } from '../../models'

export function createProject(project) {
  return Project.create(project)
}

export function getProjectById(id) {
  return Project.findById(id).exec()
}

export function updateProject(id, fields) {
  return Project.findByIdAndUpdate(id, fields, { new: true }).exec()
}

export function deleteProject(id) {
  return Project.findByIdAndDelete(id).exec()
}

export function getAllProjects() {
  return Project.find({}).exec()
}

export function getProjectByUserId(ownerId) {
  return Project.findOne({ ownerId }) //
    .populate({
      path: 'categories',
      populate: {
        path: 'tasks'
      }
    })
}

/**
 * 删除项目及其关联
 * @param {String} id
 */
export async function deleteProjectRelated(id) {
  // 删除任务
  await Task.update({ project: id }, { delete: true })
  // 删除分类
  await Category.update({ project: id }, { delete: true })
  // 删除项目
  await Project.update({ _id: id }, { delete: true })
  return null
}
