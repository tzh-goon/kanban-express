import axios from 'axios'
import { User, UserAuth } from '../../models'
import config from '../../utils/config'

/**
 * 获取微信授权信息
 * @param {String} code
 */
async function getWechatAccessToken(code) {
  const url = `https://api.weixin.qq.com/sns/oauth2/access_token?appid=${config.WECHAT_APP_ID}&secret=${config.WECHAT_APP_SECRET}&code=${code}&grant_type=authorization_code`
  const response = await axios.get(url)
  return {
    accessToken: response.data.access_token,
    refreshToken: response.data.refresh_token,
    openId: response.data.openid
  }
}

// /**
//  * 刷新微信token
//  * @param {String} refreshToken
//  */
// async function getWechatAccessTokenRefreshed(refreshToken) {
//   const url = `https://api.weixin.qq.com/sns/oauth2/refresh_token?appid=${config.WECHAT_APP_ID}&refresh_token=${refreshToken}&grant_type=refresh_token`
//   const response = await axios.get(url)
//   return response.data.access_token
// }

/**
 * 获取微信授权信息
 * @param {String} accessToken
 * @param {String} openId
 */
async function getWechatUserInfo(accessToken, openId) {
  const url = `https://api.weixin.qq.com/sns/userinfo?access_token=${accessToken}&openid=${openId}`
  const response = await axios.get(url)
  return response.data
}

export async function loginByWechat(code) {
  const { accessToken, openId } = await getWechatAccessToken(code)
  const info = await getWechatUserInfo(accessToken, openId)
  // 创建新用户
  const user = await User.create({
    userName: info.nickname,
    displayName: info.nickname,
    avatar: info.headimgurl
  })
  // 创建新授权方式
  const userAuth = await UserAuth.create({
    ownerId: user.id
  })
  return userAuth
}
