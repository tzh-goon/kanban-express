import { Router } from 'express'
import { sendResp } from '../../utils'
import { getAllUsers } from '../../controllers'

const router = Router()
router.get('/all', function (req, res, next) {
  getAllUsers()
    .then(e => sendResp(res, e))
    .catch(next)
})

export default router
