import { dbExec } from '../../db'

interface Role {
  id: number
  name: string
  permissions: string[]
}

export const getUserRole = async (id: number): Promise<Partial<Role>> => {
  return (await dbExec('SELECT * from `roles` WHERE id = ?', [id]))?.rows?.[0] as Role ?? {}
}
