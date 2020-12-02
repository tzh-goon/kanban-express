import { Schema, model } from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'

const schema = new Schema({
  title: { type: String, default: '' },
  description: { type: String, default: null },
  priority: { type: String, default: null },
  beginTime: { type: Date, default: null },
  endTime: { type: Date, default: null },
  finish: { type: Boolean, default: false },
  finishTime: { type: Date, default: null },
  project: { type: Schema.Types.ObjectId, ref: 'Project' },
  category: { type: Schema.Types.ObjectId, ref: 'Category' },
  owner: { type: Schema.Types.ObjectId, ref: 'User' },
  delete: { type: Boolean, default: false },
  updateTime: { type: Date, default: Date.now },
  createTime: { type: Date, default: Date.now }
})

schema.plugin(mongoosePaginate)

export const Task = model('Task', schema)
