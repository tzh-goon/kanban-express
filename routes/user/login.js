import Router from 'express-promise-router'
import { loginByWechatMiniProgram } from '@/Controllers'

const router = Router()
router.post('/login_by_wechat_mini_program', loginByWechatMiniProgram)

export default router
