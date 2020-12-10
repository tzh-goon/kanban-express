import assert from 'assert'
import { User } from '@/Models'
import { sendResp } from '@/Utils'

/**
 * @route POST /user
 * @summary 新建用户
 * @group user - 用户
 * @param {object} fields.body.required - 用户信息
 * @returns {User.model} 200
 * @security JWT
 */
export async function createUser(req, res, next) {
  const fields = req.body
  const user = await User.create(fields)
  sendResp(res, user)
}

/**
 * @route GET /user/:id
 * @summary 获取用户信息
 * @group user - 用户
 * @param {string} id.params.required - 用户id
 * @returns {User.model} 200
 * @security JWT
 */
export async function getUserById(req, res, next) {
  const id = req.params.id
  const user = await User.findOne({ _id: id, delete: false }).exec()
  assert.ok(!!user, 'Not Found')
  sendResp(res, user)
}

/**
 * @route PUT /user/:id
 * @summary 修改用户信息
 * @group user - 用户
 * @param {string} id.params.required - 用户id
 * @returns {User.model} 200
 * @security JWT
 */
export async function updateUser(req, res, next) {
  const id = req.params.id
  const fields = req.body
  const user = await User.findByIdAndUpdate(id, fields, { new: true }).exec()
  sendResp(res, user)
}

/**
 * @route DELETE /user/:id
 * @summary 删除用户信息
 * @group user - 用户
 * @param {string} id.params.required - 用户id
 * @returns {null} 200
 * @security JWT
 */
export async function deleteUser(req, res, next) {
  const id = req.params.id
  await User.findByIdAndUpdate(id, { delete: true }, { new: true }).exec()
  sendResp(res, null)
}

/**
 * @route GET /user
 * @summary 查询所有用户信息
 * @group user - 用户
 * @returns {Array.<User>} 200 -  An array of user info
 * @security JWT
 */
export async function getAllUser(req, res, next) {
  const list = await User.find({}).exec()
  sendResp(res, list)
}
