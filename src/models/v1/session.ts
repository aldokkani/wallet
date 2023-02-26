import { dbExec } from '../../db'

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
