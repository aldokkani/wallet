import express, { type Response, type Request, type NextFunction } from 'express'
import morgan from 'morgan'
import authRouter from './routers/v1/auth'
import userRouter from './routers/v1/user'
import walletRouter from './routers/v1/wallet'

const app = express()
const LOG_FORMAT = process.env['LOG_FORMAT'] ?? 'dev'

app.use(morgan(LOG_FORMAT))

app.use('/api/v1', authRouter, userRouter, walletRouter)

// Fallback 404 route handler
app.use((_req, res) =>
  res
    .status(404)
    .json({ message: '404 NOT FOUND' })
)

// Generic error exception handler
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
