const mongoose = require('mongoose')
const Schema = mongoose.Schema

const taskScheme = new Schema({
  title: String,
  description: String,
  priority: String,
  beginTime: Date,
  endTime: Date,
  projectId: { type: Schema.Types.ObjectId, ref="Project" },
  categoryId: { type: Schema.Types.ObjectId, ref="Category" },
  ownerId: { type: Schema.Types.ObjectId, ref="User" },
  updateTime: { type: Date, default: Date.now },
  createTime: { type: Date, default: Date.now }
})
const Task = mongoose.model('Task', taskScheme)
module.exports = Task;