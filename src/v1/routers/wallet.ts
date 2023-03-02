import { Router } from 'express'
import { depositController, withdrawController } from '../controllers/wallet'
import hasPermission from '../middleware/has-permission'
import validateBalance from '../middleware/validate-balance'

const walletRouter = Router()

walletRouter.post('/deposit', validateBalance, hasPermission, depositController)
walletRouter.post('/withdraw', validateBalance, hasPermission, withdrawController)

export default walletRouter.use('/wallet', walletRouter)
