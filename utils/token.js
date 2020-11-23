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

/**
 * decode token
 */
export function tokenSupplyHandler(req, res, next) {
  try {
    const [, token] = req.headers.authorization.split(' ')
    const dtoken = jwt.decode(token, { complete: true }) || {}
    const id = dtoken.payload.userId
    req.user = { id }
    next()
  } catch (e) {
    next()
  }
}
