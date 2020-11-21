import { Schema, model } from 'mongoose'

const taskScheme = new Schema({
  title: String,
  description: String,
  priority: String,
  beginTime: Date,
  endTime: Date,
  projectId: { type: Schema.Types.ObjectId, ref: 'Project' },
  categoryId: { type: Schema.Types.ObjectId, ref: 'Category' },
  ownerId: { type: Schema.Types.ObjectId, ref: 'User' },
  updateTime: { type: Date, default: Date.now },
  createTime: { type: Date, default: Date.now }
})
export const Task = model('Task', taskScheme)
