import { dbExec } from '../../db'

export enum TransactionStatus {
  INCOMPLETE = 'incomplete',
  COMPLETE = 'completed',
  FAILED = 'failed',
}

export enum TransactionType {
  DEPOSIT = 'deposit',
  WITHDRAW = 'withdraw',
}

interface Transaction {
  id: number
  userId: number
  type: TransactionType
  value: number
  status: TransactionStatus
}

export const createTransaction = async ({ id, userId, type, value, status }: Transaction): Promise<Transaction> => {
  return (await dbExec(
    'INSERT INTO `transactions` VALUES (?, ?, ?, ?, ?)',
    [id, userId, type, value, status]
  ))?.rows?.[0] as Transaction ?? {}
}

export const updateTransactionStatus = async (id: number, status: TransactionStatus): Promise<Transaction> => {
  return (await dbExec('UPDATE `transactions` SET status = ? WHERE id = ?', [status, id]))?.rows?.[0] as Transaction ?? {}
}
