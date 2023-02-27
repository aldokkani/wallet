import { compare } from 'bcrypt'
import type { NextFunction, Request, Response } from 'express'
import { ErrorWithStatus } from '../../utils'
import { createSession } from '../models/session'
import { createUser, findUserByEmail } from '../models/user'

export const loginController = async ({ body }: Request, res: Response, next: NextFunction): Promise<void> => {
  const { email, password } = body
  const { password: hashedPassword, id } = await findUserByEmail(email)

  if (hashedPassword === undefined || !await compare(password, hashedPassword)) {
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

export const signupController = ({ body }: Request, res: Response, next: NextFunction): void => {
  const { email, password } = body
  createUser(email, password)
    .then(() => {
      res
        .status(200)
        .json({
          message: 'user was created'
        })
    })
    .catch(next)
}
