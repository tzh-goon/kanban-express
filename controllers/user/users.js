import { User } from '../../models'
import { sendResp } from '../../utils'

export async function createUser(req, res, next) {
  const fields = req.body
  const user = await User.create(fields)
  sendResp(res, user)
}

export async function getUserById(req, res, next) {
  const id = req.params.id
  const user = await User.findById(id).exec()
  sendResp(res, user)
}

export async function updateUser(req, res, next) {
  const id = req.params.id
  const fields = req.body
  const user = await User.findByIdAndUpdate(id, fields, { new: true }).exec()
  sendResp(res, user)
}

export async function deleteUser(req, res, next) {
  const id = req.params.id
  await User.findByIdAndDelete(id).exec()
  sendResp(res, null)
}
