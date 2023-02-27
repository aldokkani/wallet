import { hash } from 'bcrypt'
import { dbExec } from '../../db'

interface User {
  id: number
  email: string
  password: string
  balance: number
  roleId: number
}

export const findUserByEmail = async (email: string): Promise<User> => {
  return (await dbExec('SELECT * from `users` WHERE email = ?', [email]))?.rows?.[0] as User ?? {}
}

export const createUser = async (email: string, password: string): Promise<User> => {
  const SALT_ROUND = process.env['SALT_ROUNDS'] ?? 10
  const hashedPassword = await hash(password, SALT_ROUND)
  return (await dbExec('INSERT INTO `users` (email, password, balance) VALUES (?, ?, 0)', [email, hashedPassword]))?.rows?.[0] as User
}
