import assert from 'assert'
import got from 'got'
import { config, sendResp, generateToken } from '@/Utils'
import { User, UserAuth } from '@/Models'

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
 * @param {Object} fields 微信用户基本信息
 */
async function createUserAuth(sessionKey, openId, fields) {
  const { nickName, avatarUrl } = fields
  // 创建新用户
  const user = await User.create({
    userName: nickName,
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
 * @route POST /login/login_by_wechat_mini_program
 * @group login - 登录
 * @summary - 微信授权登录且自动注册
 * @param {object} fields.body.required {"userName": "", "imageUrl": ""}
 * @param {string} code.query.required 微信授权码（js_code）
 * @returns {object} 200 授权信息
 */
export async function loginByWechatMiniProgram(req, res, next) {
  const code = req.query.code
  const userFields = req.body
  assert.ok(!!code, 'code 不能为空')

  const { sessionKey, openId } = await getSessionByJsCode(code)
  let user = await getUserAuth({ identifier: openId, identityType: 'wechat' })
  if (!user) {
    user = await createUserAuth(sessionKey, openId, userFields)
  }
  const token = generateToken({ userId: user.id })
  sendResp(res, token)
}
