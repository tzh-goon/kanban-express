const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  userName: String,
  nickName: String,
  gender: String,
  avatar: String,
  birthday: Date,
  mobile: String,
  updateTime: { type: Date, default: Date.now },
  createTime: { type: Date, default: Date.now }
})

const User = mongoose.model('User', userSchema)
module.exports = User
