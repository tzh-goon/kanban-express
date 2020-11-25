import Router from 'express-promise-router'
import { loginByWechatMiniProgram } from '../../controllers'

const router = Router()
router.post('/login_by_wechat_mini_program', loginByWechatMiniProgram)

export default router
