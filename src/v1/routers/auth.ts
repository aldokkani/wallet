import { Router } from 'express'
import { loginController, logoutController, signupController } from '../controllers/auth'

const authRouter = Router()

authRouter.post('/login', loginController)
authRouter.post('/logout', logoutController)
authRouter.post('/signup', signupController)

export default authRouter.use('/auth', authRouter)
