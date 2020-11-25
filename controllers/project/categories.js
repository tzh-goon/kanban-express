import assert from 'assert'
import { Category, Task } from '../../models'
import { sendResp } from '../../utils'

function addCategoryToProject(categoryId, projectId, index) {
  return Category.updateOne(
    { _id: projectId },
    {
      $push: { categories: { $each: [categoryId], $position: index } }
    }
  ).exec()
}

function removeCategoryFromProject(categoryId, projectId) {
  return Category.updateOne(
    { _id: projectId },
    {
      $pull: { categories: categoryId }
    }
  ).exec()
}

export async function createCategory(req, res, next) {
  const { index, ...fields } = req.body
  assert.ok(!!fields.project, 'project 不能为空')
  const category = await Category.create(fields)
  await addCategoryToProject(category.id, category.project, index)
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
  await removeCategoryFromProject(id, category.project)
  sendResp(res, null)
}
