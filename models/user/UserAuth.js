const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schema = new Schema({
  identifier: String, // 唯一标识
  identityType: String, // 唯一标识类型，weixin
  certificate: String,
  ownerId: { type: Schema.Types.ObjectId, ref: 'User' },
  updateTime: { type: Date, default: Date.now },
  createTime: { type: Date, default: Date.now }
})
const UserAuth = mongoose.model('UserAuth', schema)
module.exports = UserAuth
