import type { NextFunction, Response } from 'express'
import type { AuthUserRequest } from '../../utils'
import { findUserById } from '../models/user'

export const balanceController = (req: AuthUserRequest, res: Response, next: NextFunction): void => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  findUserById(req.userId!)
    .then(({ balance }) => res.status(200).json({ balance }))
    .catch(next)
}
