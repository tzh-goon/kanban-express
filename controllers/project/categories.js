import { Category, Task } from '../../models'

export function addCategoryToProject(categoryId, projectId, index) {
  return Category.updateOne(
    { _id: projectId },
    {
      $push: { categories: { $each: [categoryId], $position: index } }
    }
  ).exec()
}

export function removeCategoryFromProject(categoryId, projectId) {
  return Category.updateOne(
    { _id: projectId },
    {
      $pull: { categories: categoryId }
    }
  ).exec()
}

export async function createCategory(val, index) {
  const category = await Category.create(val)
  await addCategoryToProject(category.id, category.project, index)
  return category
}

export function getCategoryById(id) {
  return Category.findById(id).exec()
}

export function updateCategory(id, fields) {
  return Category.findByIdAndUpdate(id, fields, { new: true }).exec()
}

export async function deleteCategory(id) {
  const category = await Category.updateOne({ _id: id }, { delete: true })
  await Task.update({}, { _id: { $in: category.tasks } }, { delete: true })
  await removeCategoryFromProject(id, category.project)
}

export function getAllCategorys() {
  return Category.find({}).exec()
}
