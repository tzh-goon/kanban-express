import assert from 'assert'
import got from 'got'
import config from '../../utils/config'
import { User, UserAuth } from '../../models'
import { generateToken } from '../../utils/token'
import { sendResp } from '../../utils'

/**
 * 获取微信授权信息
 * @param {String} code
 */
async function getSessionByJsCode(code) {
  const url = `https://api.weixin.qq.com/sns/jscode2session?appid=${config.WECHAT_APP_ID}&secret=${config.WECHAT_APP_SECRET}&js_code=${code}&grant_type=authorization_code`
  const response = await got.get(url, { responseType: 'json' })
  return {
    sessionKey: response.body.session_key,
    openId: response.body.openid
  }
}

/**
 * 根据授权信息获得用户信息
 * @param {String} type
 * @param {String} id
 */
async function getUserAuth(option) {
  const userAuth = await UserAuth.findOne(option).exec()
  if (!userAuth) return null
  const user = await User.findById(userAuth.userId).exec()
  return user
}

/**
 * 微信注册
 * @param {Object} info 微信用户基本信息
 */
async function createUserAuth(sessionKey, openId, info) {
  const { nickName, avatarUrl } = info
  // 创建新用户
  const user = await User.create({
    userName: nickName,
    displayName: nickName,
    avatar: avatarUrl
  })
  // 创建新授权方式
  const userAuth = await UserAuth.create({
    userId: user.id,
    identifier: openId,
    identityType: 'wechat',
    certificate: sessionKey
  })
  return { user, userAuth }
}

/**
 * 微信授权登录，自动注册
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export async function loginByWechatMiniProgram(req, res, next) {
  const { code, ...userFields } = req.body
  assert.ok(!!code, 'code 不能为空')

  const { sessionKey, openId } = await getSessionByJsCode(code)
  let user = await getUserAuth({ identifier: openId, identityType: 'wechat' })
  if (!user) {
    user = await createUserAuth(sessionKey, openId, userFields)
  }
  const token = generateToken({ userId: user.id })
  sendResp(res, token)
}
