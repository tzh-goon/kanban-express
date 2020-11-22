import jwt from 'jsonwebtoken'
import config from './config'

/**
 * 生成token
 * @param {Object} payload
 */
export function generateToken(payload) {
  const token = jwt.sign(payload, config.JWT_SECRET, { expiresIn: 24 * 60 * 60 })
  return { accessToken: token }
}
