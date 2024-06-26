import express from 'express'
import { getUser, signin, signup } from '../controllers/authController.js'

const router = express.Router()

router.post('/signup', signup)  
router.post('/signin', signin)
router.get('/user/:id', getUser)

export default router
