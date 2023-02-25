import express from 'express'
import morgan from 'morgan'
import authRouter from './routers/auth'
import userRouter from './routers/user'
import walletRouter from './routers/wallet'

const app = express()
const LOG_FORMAT = process.env['LOG_FORMAT'] ?? 'dev'

app.use(morgan(LOG_FORMAT))

app.use('auth', authRouter)
app.use('users', userRouter)
app.use('wallet', walletRouter)

export default app
