import assert from 'assert'
import { Category, Project, Task } from '@/Models'
import { sendResp } from '@/Utils'

export function addCategoryToProject(projectId, categoryIds, index = 0) {
  return Project.updateOne(
    { _id: projectId },
    {
      $push: { categories: { $each: categoryIds, $position: index } }
    }
  ).exec()
}

export function removeCategoryFromProject(projectId, categoryId) {
  return Project.updateOne(
    { _id: projectId },
    {
      $pull: { categories: categoryId }
    }
  ).exec()
}

export async function createCategory(req, res, next) {
  const fields = req.body
  assert.ok(!!fields.project, 'project 不能为空')
  const category = await Category.create(fields)
  await addCategoryToProject(category.project, [category.id])
  sendResp(res, category)
}

export async function getCategoryById(req, res, next) {
  const id = req.params.id
  const category = await Category.findById(id).exec()
  sendResp(res, category)
}

export async function updateCategory(req, res, next) {
  const id = req.params.id
  const fields = req.body
  const category = await Category.findByIdAndUpdate(id, fields, { new: true }).exec()
  sendResp(res, category)
}

export async function deleteCategory(req, res, next) {
  const id = req.params.id
  const category = await Category.updateOne({ _id: id }, { delete: true })
  await Task.update({}, { _id: { $in: category.tasks } }, { delete: true })
  await removeCategoryFromProject(category.project, id)
  sendResp(res, null)
}
