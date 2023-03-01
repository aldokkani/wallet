import { Router } from 'express'
import { balanceController } from '../controllers/users'
import hasPermission from '../middleware/has-permission'

const userRouter = Router()

userRouter.get('/balance', hasPermission, balanceController)

export default userRouter.use('/users', userRouter)
