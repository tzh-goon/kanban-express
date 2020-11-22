import { Router } from 'express'
import { sendResp } from '../../utils'
import { loginByWechatMiniProgram } from '../../controllers'

const router = Router()

router.post('/login_by_wechat_mini_program', function (req, res, next) {
  const { code, ...userinfo } = req.body
  loginByWechatMiniProgram(code, userinfo)
    .then(e => sendResp(res, e))
    .catch(next)
})

export default router
