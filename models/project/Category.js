import { Schema, model } from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'

const schema = new Schema(
  {
    title: { type: String, default: '' },
    description: { type: String, default: '' },
    tasks: [{ type: Schema.Types.ObjectId, ref: 'Task' }],
    project: { type: Schema.Types.ObjectId, ref: 'Project' },
    owner: { type: Schema.Types.ObjectId, ref: 'User' },
    delete: { type: Boolean, default: false }
  },
  {
    timestamps: true
  }
)

schema.plugin(mongoosePaginate)

export const Category = model('Category', schema)
