import { Category } from '../../models'

export function createCategory(task) {
  return Category.create(task)
}

export function getCategoryById(id) {
  return Category.findById(id).exec()
}

export function updateCategory(id, fields) {
  return Category.findByIdAndUpdate(id, fields, { new: true }).exec()
}

export function deleteCategory(id) {
  return Category.findByIdAndDelete(id).exec()
}

export function getAllCategorys() {
  return Category.find({}).exec()
}
