import { Router } from 'express'
import { getUserById, createUser, updateUser, deleteUser } from '@/Controllers'

const router = Router()
router.post('/', createUser)
router.get('/:id', getUserById)
router.put('/:id', updateUser)
router.delete('/:id', deleteUser)

export default router
