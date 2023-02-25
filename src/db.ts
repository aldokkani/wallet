import { createPool, type FieldPacket, type RowDataPacket } from 'mysql2'

const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } = process.env
export const dbConnectionPool = createPool({
  host: DB_HOST as string,
  user: DB_USER as string,
  password: DB_PASSWORD as string,
  database: DB_NAME as string,
  waitForConnections: true,
  connectionLimit: 10,
  maxIdle: 10,
  idleTimeout: 60000,
  queueLimit: 0
})

type Primitives = string | number | boolean

export const dbExec = async (query: string, values?: Primitives[]): Promise<{ rows: RowDataPacket[], fields?: FieldPacket[] }> => {
  return await new Promise((resolve, reject) => {
    dbConnectionPool.getConnection((err, conn) => {
      if (err != null) {
        reject(err)
        return
      }

      conn.execute(query, values, (err: Error, rows: RowDataPacket[], fields: FieldPacket[]) => {
        if (err != null) {
          reject(err)
          return
        }

        conn.release()
        resolve({ rows, fields })
      })
    })
  })
}
