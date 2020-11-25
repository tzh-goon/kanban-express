import { Router } from 'express'
import { getCategoryById, createCategory, updateCategory, deleteCategory } from '../../controllers'

const router = Router()
router.post('/category', createCategory)
router.get('/category/:id', getCategoryById)
router.put('/category/:id', updateCategory)
router.delete('/category/:id', deleteCategory)

export default router
