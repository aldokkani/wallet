import type { NextFunction, Response } from 'express'
import { type AuthUserRequest, ErrorWithStatus } from '../../utils'

export default async (req: AuthUserRequest, _res: Response, next: NextFunction): Promise<void> => {
  req.body.balance = Number(req.body.balance)

  if (isNaN(req.body.balance)) { next(new ErrorWithStatus('balance should be a valid number', { statusCode: 400 })); return }

  next()
}
