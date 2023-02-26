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
