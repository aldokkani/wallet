import { dbExec } from '../../db'

interface Session {
  id: number
  userId: number
  expire: string
}

const formatTime = (time: number): string => {
  const date = new Date(time)
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
}

export const createSession = async (userId: number): Promise<number> => {
  const hourInMilSec = 1000 * 60 * 60
  const expire = Date.now() + hourInMilSec
  const id = expire + userId
  const expireFormatted = formatTime(expire)

  await dbExec(
    'INSERT INTO `sessions` VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE id=?, expire=?',
    [id, userId, expireFormatted, id, expireFormatted]
  )
  return id
}

export const isSessionExpired = async (sessionId: number): Promise<boolean> => {
  const { expire } = (await dbExec('SELECT `expire` from `sessions` where id=?', [sessionId])).rows?.[0] as Session ?? {}
  const millisecondsLeft = +new Date(expire) - Date.now()
  return isNaN(millisecondsLeft) || millisecondsLeft <= 0
}

export const getSessionById = async (sessionId: number): Promise<Partial<Session>> => {
  return (await dbExec('SELECT * from `sessions` where id=?', [sessionId])).rows?.[0] as Session ?? {}
}
