import express, { type Response, type Request, type NextFunction } from 'express'
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
app.use((_req, res) =>
  res
    .status(404)
    .json({ message: '404 NOT FOUND' })
)
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) =>
  res
    .status(500)
    .json({
      message: 'Server internal error',
      errMsg: err.message,
      stacktrace: err.stack // TODO: omit on prod
    })
)

export default app
