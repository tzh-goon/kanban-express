import assert from 'assert'
import got from 'got'
import { config, sendResp, generateToken } from '@/Utils'
import { User, UserAuth } from '@/Models'

/**
 * @route POST /login/login_by_wechat_mini_program
 * @group login - 登录
 * @summary - 微信授权登录且自动注册
 * @param {object} fields.body.required {"nickName": "", "imageUrl": ""}
 * @param {string} code.query.required 微信授权码（js_code）
 * @returns {object} 200 授权信息
 */
export async function loginByWechatMiniProgram(req, res, next) {
  const code = req.query.code
  const userFields = req.body
  assert.ok(!!code, 'code 不能为空')

  // jscode => openId
  const jscodeUrl = `https://api.weixin.qq.com/sns/jscode2session?appid=${config.WECHAT_APP_ID}&secret=${config.WECHAT_APP_SECRET}&js_code=${code}&grant_type=authorization_code`
  const response = await got.get(jscodeUrl, { responseType: 'json' })
  const { session_key: sessionKey, openid: openId } = response.body

  // openId => UserAuth
  let userAuth = await UserAuth.findOne({
    identifier: openId,
    identityType: 'wechat'
  }).exec()

  if (!userAuth) {
    // create User
    const user = await User.create({
      userName: userFields.nickName,
      avatar: userFields.avatarUrl
    })
    // create UserAuth
    userAuth = await UserAuth.create({
      userId: user.id,
      identifier: openId,
      identityType: 'wechat',
      certificate: sessionKey
    })
  }
  const userId = userAuth.userId
  // userId => token
  const token = generateToken({ userId })
  sendResp(res, token)
}
