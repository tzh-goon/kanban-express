import { Schema, model } from 'mongoose'

const taskScheme = new Schema({
  title: String,
  description: String,
  priority: String,
  beginTime: Date,
  endTime: Date,
  delete: Boolean,
  project: { type: Schema.Types.ObjectId, ref: 'Project' },
  category: { type: Schema.Types.ObjectId, ref: 'Category' },
  createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
  updateTime: { type: Date, default: Date.now },
  createTime: { type: Date, default: Date.now }
})
export const Task = model('Task', taskScheme)
