import { Schema, model } from 'mongoose'

const projectScheme = new Schema({
  title: { type: String, default: '' },
  description: { type: String, default: '' },
  imageUrl: { type: String, default: null },
  categories: [{ type: Schema.Types.ObjectId, ref: 'Category' }],
  owner: { type: Schema.Types.ObjectId, ref: 'User' },
  delete: { type: Boolean, default: false },
  updateTime: { type: Date, default: Date.now },
  createTime: { type: Date, default: Date.now }
})
export const Project = model('Project', projectScheme)
