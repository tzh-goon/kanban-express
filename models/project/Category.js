import { Schema, model } from 'mongoose'

const shema = new Schema({
  title: String,
  description: String,
  type: String,
  tasks: [{ type: Schema.Types.ObjectId, ref: 'Task' }],
  project: { type: Schema.Types.ObjectId, ref: 'Project' },
  owner: { type: Schema.Types.ObjectId, ref: 'User' },
  updateTime: { type: Date, default: Date.now },
  createTime: { type: Date, default: Date.now }
})
export const Category = model('Category', shema)
