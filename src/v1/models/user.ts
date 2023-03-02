import { hash } from 'bcrypt'
import { dbExec } from '../../db'
import { ErrorWithStatus } from '../../utils'

interface User {
  id: number
  email: string
  password: string
  balance: number
  roleId: number
}

export const findUserById = async (id: number): Promise<User> => {
  return (await dbExec('SELECT * from `users` WHERE id = ?', [id]))?.rows?.[0] as User ?? {}
}

export const findUserByEmail = async (email: string): Promise<User> => {
  return (await dbExec('SELECT * from `users` WHERE email = ?', [email]))?.rows?.[0] as User ?? {}
}

export const createUser = async (email: string, password: string): Promise<User> => {
  const SALT_ROUND = process.env['SALT_ROUNDS'] ?? 10
  const hashedPassword = await hash(password, SALT_ROUND)
  return (await dbExec('INSERT INTO `users` (email, password, balance) VALUES (?, ?, 0)', [email, hashedPassword]))?.rows?.[0] as User
}

export const updateUserBalance = async (id: number, balance: number): Promise<User> => {
  const { balance: userBalance } = await findUserById(id)
  const newBalance = +userBalance + balance

  if (newBalance < 0) {
    throw new ErrorWithStatus('Not enough balance', { statusCode: 400 })
  }
  return (await dbExec('UPDATE `users` SET balance = ? WHERE id = ?', [newBalance, id]))?.rows?.[0] as User ?? {}
}
