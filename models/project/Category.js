const mongoose = require('mongoose')
const Schema = mongoose.Schema

const shema = new Schema({
  title: String,
  description: String,
  type: String,
  projectId: { type: Schema.Types.ObjectId, ref: 'Project' },
  ownerId: { type: Schema.Types.ObjectId, ref: 'User' },
  updateTime: { type: Date, default: Date.now },
  createTime: { type: Date, default: Date.now }
})
const Category = mongoose.model('Category', shema)
module.exports = Category
