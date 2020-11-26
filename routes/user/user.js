import { Router } from 'express'
import { getAllUser, getUserById, createUser, updateUser, deleteUser } from '@/Controllers'

const router = Router()
router.get('/', getAllUser)
router.post('/', createUser)
router.get('/:id', getUserById)
router.put('/:id', updateUser)
router.delete('/:id', deleteUser)

export default router
