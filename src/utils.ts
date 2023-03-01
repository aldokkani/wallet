import type { Request } from 'express'

export class ErrorWithStatus extends Error {
  readonly statusCode
  constructor (
    message: string,
    options: ErrorOptions & { statusCode: number }
  ) {
    super(message, options)
    this.statusCode = options.statusCode
  }
}

export interface AuthUserRequest extends Request {
  userId?: number
}
