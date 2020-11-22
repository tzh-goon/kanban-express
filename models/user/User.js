import { Schema, model } from 'mongoose'

const userSchema = new Schema({
  userName: String,
  displayName: String,
  gender: String,
  avatar: String,
  birthday: Date,
  mobile: String,
  updateTime: { type: Date, default: Date.now },
  createTime: { type: Date, default: Date.now }
})

export const User = model('User', userSchema)
