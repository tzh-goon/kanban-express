import { Router } from 'express'
import { loginByWechat } from '../../controllers'
const router = Router()

router.post('/login_by_wechat', function (req, res, next) {
  const code = req.body.code
  loginByWechat(code)
    .then(e => res.json(e))
    .catch(next)
})

export default router
