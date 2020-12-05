import { Category, Project, Task } from '@/Models'
import { sendResp } from '@/Utils'
import { ensureProjectExisted } from './projects'

export function addCategoryToProject(projectId, categoryIds, index = 0) {
  return Project.updateOne(
    { _id: projectId },
    { $push: { categories: { $each: categoryIds, $position: index } } }
  ).exec()
}

export function removeCategoryFromProject(projectId, categoryId) {
  return Project.updateOne({ _id: projectId }, { $pull: { categories: categoryId } }).exec()
}

export async function createCategory(req, res, next) {
  const { projectId } = req.params
  const { index, ...fields } = req.body
  // 确保项目存在
  await ensureProjectExisted(projectId)
  // 创建分组
  const category = await Category.create({ ...fields, project: projectId })
  // 添加分组到项目
  await addCategoryToProject(projectId, [category.id], index)
  sendResp(res, category)
}

export async function getCategoryById(req, res, next) {
  const id = req.params.id
  const category = await Category.findOne({ _id: id, delete: false }).orFail().exec()
  sendResp(res, category)
}

export async function updateCategory(req, res, next) {
  const id = req.params.id
  const fields = req.body
  const category = await Category.findOneAndUpdate(
    { _id: id, delete: false },
    { ...fields, updateTime: Date.now() },
    { new: true }
  )
    .orFail()
    .exec()
  sendResp(res, category)
}

export async function deleteCategory(req, res, next) {
  const { projectId, id } = req.params
  // 删除分类，不会清空所属关系
  const category = await Category.updateOne(
    { _id: id, project: projectId },
    { delete: true, updateTime: Date.now() }
  ).exec()
  if (category) {
    // 从项目中移除
    await removeCategoryFromProject(projectId, id)
    // 移除所属任务
    await Task.update({ _id: { $in: category.tasks } }, { delete: true })
  }
  sendResp(res, null)
}

export async function orderCategory(req, res, next) {
  const { projectId } = req.params
  const ids = req.body
  await Project.updateOne({ _id: projectId, delete: false }, { categories: ids }).orFail().exec()
  sendResp(res, true)
}
