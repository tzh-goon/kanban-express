import jwt from 'jsonwebtoken'
import config from './config'

/**
 * 生成token
 * @param {Object} payload
 */
export function generateToken(payload) {
  const token = jwt.sign(payload, config.JWT_SECRET, { expiresIn: config.JWT_EXPIRES })
  return { accessToken: token }
}
