import type { NextFunction, Response } from 'express'
import { transactionsQueue } from '../../consumers'
import { type AuthUserRequest, ErrorWithStatus } from '../../utils'
import { findUserById } from '../models/user'

export const depositController = ({ body: { balance }, userId }: AuthUserRequest, res: Response, next: NextFunction): void => {
  transactionsQueue.add(
    'deposit',
    { balance, userId },
    { priority: 1 }
  ).then(job => {
    res
      .status(201)
      .json({
        message: 'deposit transaction was created',
        jobId: job.id
      })
  }).catch(next)
}

export const withdrawController = async ({ body: { balance }, userId }: AuthUserRequest, res: Response, next: NextFunction): Promise<void> => {
  const finalBalance: number = balance > 0 ? balance * -1 : balance // Make sure the withdraw trans is going to deduct money

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const { balance: userBalance } = await findUserById(userId!)

  if (+userBalance + finalBalance < 0) {
    next(new ErrorWithStatus('Not enough balance', { statusCode: 400 }))
    return
  }

  transactionsQueue.add(
    'withdraw',
    { balance: finalBalance, userId },
    { priority: 3 }
  ).then(job => {
    res
      .status(201)
      .json({
        message: 'withdraw transaction was created',
        jobId: job.id
      })
  }).catch(next)
}
