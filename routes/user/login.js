import { Router } from 'express'
import { loginByWechatMiniProgram } from '../../controllers'

const router = Router()

router.post('/login_by_wechat_mini_program', function (req, res, next) {
  const { code, ...userinfo } = req.body
  loginByWechatMiniProgram(code, userinfo)
    .then(e => res.json(e))
    .catch(next)
})

export default router
