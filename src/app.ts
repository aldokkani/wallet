import express, { type Response, type Request, type NextFunction } from 'express'
import morgan from 'morgan'
import authRouter from './v1/routers/auth'
import userRouter from './v1/routers/user'
import walletRouter from './v1/routers/wallet'
import { ErrorWithStatus } from './utils'

const app = express()
const LOG_FORMAT = process.env['LOG_FORMAT'] ?? 'dev'

app.use(morgan(LOG_FORMAT))
app.use(express.json())

app.use('/api/v1', authRouter, userRouter, walletRouter)

// Fallback 404 route handler
app.use((_req, res) =>
  res
    .status(404)
    .json({ message: '404 NOT FOUND' })
)

// Generic error exception handler
app.use((err: Error | ErrorWithStatus, _req: Request, res: Response, _next: NextFunction) =>
  res
    .status(err instanceof ErrorWithStatus ? err.statusCode : 500)
    .json({
      message: err.message,
      stacktrace: err.stack // TODO: omit on prod
    })
)

export default app
