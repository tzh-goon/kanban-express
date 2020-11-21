import { Schema, model } from 'mongoose'

const schema = new Schema({
  identifier: String, // 唯一标识
  identityType: String, // 唯一标识类型，weixin
  certificate: String,
  ownerId: { type: Schema.Types.ObjectId, ref: 'User' },
  updateTime: { type: Date, default: Date.now },
  createTime: { type: Date, default: Date.now }
})
export const UserAuth = model('UserAuth', schema)
