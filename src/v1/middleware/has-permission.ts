import type { NextFunction, Response } from 'express'
import { type AuthUserRequest, ErrorWithStatus } from '../../utils'
import { getUserRole } from '../models/role'
import { getSessionById, isSessionExpired } from '../models/session'

const hasPermission = (path: string, permissions: string[] = []): boolean => {
  switch (path) {
    case '/balance':
      return permissions.includes('balance_read')
    case '/deposit':
      return true
    case '/withdraw':
      return true
    default:
      return false
  }
}

export default async (req: AuthUserRequest, _res: Response, next: NextFunction): Promise<void> => {
  const sessionId: number = Number(req.headers['session-id'])

  if (isNaN(sessionId)) {
    next(new ErrorWithStatus('Session id is missing', { statusCode: 401 }))
    return
  }

  if (await isSessionExpired(sessionId)) {
    next(new ErrorWithStatus('Session has expired', { statusCode: 401 }))
    return
  }

  const { userId } = await getSessionById(sessionId)

  if (
    userId === undefined ||
    !hasPermission(req.path, (await getUserRole(userId)).permissions)
  ) {
    next(new ErrorWithStatus(`User not authorized to access ${req.path}`, { statusCode: 401 }))
    return
  }

  // inject userId in the request for all next middleware's
  req.userId = userId
  next()
}
