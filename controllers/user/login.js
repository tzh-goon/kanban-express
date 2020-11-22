import axios from 'axios'
import { User, UserAuth } from '../../models'
import config from '../../utils/config'
import { generateToken } from '../../utils/token'

/**
 * 获取微信授权信息
 * @param {String} code
 */
export async function getWechatAccessToken(code) {
  const url = `https://api.weixin.qq.com/sns/oauth2/access_token?appid=${config.WECHAT_APP_ID}&secret=${config.WECHAT_APP_SECRET}&code=${code}&grant_type=authorization_code`
  const response = await axios.get(url)
  return {
    accessToken: response.data.access_token,
    refreshToken: response.data.refresh_token,
    openId: response.data.openid
  }
}

/**
 * 刷新微信token
 * @param {String} refreshToken
 */
export async function getWechatAccessTokenRefreshed(refreshToken) {
  const url = `https://api.weixin.qq.com/sns/oauth2/refresh_token?appid=${config.WECHAT_APP_ID}&refresh_token=${refreshToken}&grant_type=refresh_token`
  const response = await axios.get(url)
  return {
    accessToken: response.data.access_token,
    refreshToken: response.data.refresh_token,
    openId: response.data.openid
  }
}

/**
 * 获取微信授权信息
 * @param {String} accessToken
 * @param {String} openId
 */
export async function getWechatUserInfo(accessToken, openId) {
  const url = `https://api.weixin.qq.com/sns/userinfo?access_token=${accessToken}&openid=${openId}`
  const response = await axios.get(url)
  return response.data
}

/**
 * 根据授权信息获得用户信息
 * @param {String} identifier
 */
export async function getUserByAuth(type, id) {
  const userAuth = await UserAuth.findOne({ identifier: id, identityType: type }).exec()
  if (!userAuth) return null
  return User.findById(userAuth.id).exec()
}

/**
 * 微信注册
 * @param {Object} info 微信用户基本信息
 */
export async function signupByWechatUser(info) {
  const { nickname, headimgurl, openid } = info
  // 创建新用户
  const user = await User.create({
    userName: nickname,
    displayName: nickname,
    avatar: headimgurl
  })
  // 创建新授权方式
  await UserAuth.create({
    userId: user.id,
    identifier: openid,
    identityType: 'wechat'
  })
  return user
}

/**
 * 微信授权登录，自动注册
 * @param {String} code 微信授权code
 */
export async function loginByWechat(code) {
  const { accessToken, openId } = await getWechatAccessToken(code)
  let user = await getUserByAuth('wechat', openId)
  if (!user) {
    const info = await getWechatUserInfo(accessToken, openId)
    user = await signupByWechatUser(info)
  }
  return generateToken({ userId: user.id })
}
