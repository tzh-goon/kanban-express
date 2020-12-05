import Router from 'express-promise-router'
import { getCategoryById, createCategory, updateCategory, deleteCategory, orderCategory } from '@/Controllers'

const router = Router()
router.post('/project/:projectId/category', createCategory)
router.get('/project/:projectId/category/:id', getCategoryById)
router.put('/project/:projectId/category/:id', updateCategory)
router.delete('/project/:projectId/category/:id', deleteCategory)

router.post('/project/:projectId/category-order', orderCategory)

export default router
