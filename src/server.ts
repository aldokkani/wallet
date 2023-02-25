import './env'
import app from './app'
import { dbConnectionPool } from './db'

const PORT = process.env['PORT'] ?? 8000

const runServerWithDB = (): void => {
  dbConnectionPool.getConnection((err, conn) => {
    if (err != null) {
      console.log('failed to connect to the DB retrying in 5 sec...')
      setTimeout(runServerWithDB, 5000)
      return
    }

    app.listen(PORT, () => {
      conn.release()
      console.log(`Server is listening on port ${PORT}`)
    })
  })
}

runServerWithDB()
