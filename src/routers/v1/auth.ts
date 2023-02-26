import { Router } from 'express'
import { loginController, logoutController } from '../../controllers/v1/auth'

const authRouter = Router()

authRouter.post('/login', loginController)
authRouter.post('/logout', logoutController)

export default authRouter.use('/auth', authRouter)
