import { Router } from 'express'
import { getAllUsers } from '../../controllers'

const router = Router()
router.get('/all', function (req, res, next) {
  getAllUsers()
    .then(e => res.json(e))
    .catch(next)
})

export default router
