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
