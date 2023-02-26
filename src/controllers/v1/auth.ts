import type { NextFunction, Request, Response } from 'express'
import { createSession } from '../../models/v1/session'
import { findUserByEmail } from '../../models/v1/user'
import { ErrorWithStatus } from '../../utils'

export const loginController = async ({ body }: Request, res: Response, next: NextFunction): Promise<void> => {
  const { email, password: reqPass } = body
  const { password, id } = await findUserByEmail(email)

  if (password === undefined || reqPass !== password) {
    next(new ErrorWithStatus('invalid email or password', { statusCode: 404 }))
    return
  }

  const sessionId = await createSession(id)

  res
    .status(200)
    .json({
      sessionId,
      expiresAt: new Date(sessionId).toLocaleString()
    })
}

export const logoutController = (): void => {
  throw new Error('implement logout')
}
