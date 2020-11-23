import { Router } from 'express'
import { sendResp } from '../../utils'
import { getCategoryById, createCategory, updateCategory, deleteCategory } from '../../controllers'

const router = Router()
router.post('/category', function (req, res, next) {
  const category = req.body
  createCategory(category)
    .then(e => sendResp(res, e))
    .catch(next)
})

router.get('/category/:id', function (req, res, next) {
  const id = req.params.id
  getCategoryById(id)
    .then(e => sendResp(res, e))
    .catch(next)
})

router.put('/category/:id', function (req, res, next) {
  const id = req.params.id
  const data = req.body
  updateCategory(id, data)
    .then(e => sendResp(res, e))
    .catch(next)
})

router.delete('/category/:id', function (req, res, next) {
  const id = req.params.id
  deleteCategory(id)
    .then(e => sendResp(res, e))
    .catch(next)
})

export default router
