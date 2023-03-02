import Bull, { type Job } from 'bull'
import { createTransaction, TransactionStatus, TransactionType, updateTransactionStatus } from './v1/models/transaction'
import { updateUserBalance } from './v1/models/user'

export const transactionsQueue = new Bull('transactions')

transactionsQueue.process('deposit', async ({ id, data }: Job): Promise<void> => {
  const { userId, balance } = data
  await createTransaction({
    id: Number(id),
    userId,
    value: balance,
    type: TransactionType.DEPOSIT,
    status: TransactionStatus.INCOMPLETE
  })
  await updateUserBalance(userId, balance)
}).catch(err => { throw err })

transactionsQueue.process('withdraw', async ({ id, data }: Job): Promise<void> => {
  const { userId, balance } = data
  await createTransaction({
    id: Number(id),
    userId,
    value: balance,
    type: TransactionType.WITHDRAW,
    status: TransactionStatus.INCOMPLETE
  })
  await updateUserBalance(userId, balance)
}).catch(err => { throw err })

transactionsQueue.on('completed', async ({ id }: Job) => {
  await updateTransactionStatus(Number(id), TransactionStatus.COMPLETE)
})

transactionsQueue.on('failed', async ({ id }: Job) => {
  await updateTransactionStatus(Number(id), TransactionStatus.FAILED)
})
