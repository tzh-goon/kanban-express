import { Schema, model } from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'

const schema = new Schema({
  title: { type: String, default: '' },
  description: { type: String, default: '' },
  imageUrl: { type: String, default: null },
  categories: [{ type: Schema.Types.ObjectId, ref: 'Category' }],
  owner: { type: Schema.Types.ObjectId, ref: 'User' },
  delete: { type: Boolean, default: false },
  updateTime: { type: Date, default: Date.now },
  createTime: { type: Date, default: Date.now }
})

schema.plugin(mongoosePaginate)

export const Project = model('Project', schema)
