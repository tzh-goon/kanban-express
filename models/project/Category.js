import { Schema, model } from 'mongoose'

const shema = new Schema({
  title: String,
  description: String,
  type: String,
  projectId: { type: Schema.Types.ObjectId, ref: 'Project' },
  ownerId: { type: Schema.Types.ObjectId, ref: 'User' },
  updateTime: { type: Date, default: Date.now },
  createTime: { type: Date, default: Date.now }
})
export const Category = model('Category', shema)
