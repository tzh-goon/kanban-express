const mongoose = require('mongoose')
const Schema = mongoose.Schema

const projectScheme = new Schema({
  title: String,
  description: String,
  imageUrl: String,
  type: String,
  ownerId: { type: Schema.Types.ObjectId, ref: 'User' },
  updateTime: { type: Date, default: Date.now },
  createTime: { type: Date, default: Date.now }
})
const Project = mongoose.model('Project', projectScheme)
module.exports = Project
