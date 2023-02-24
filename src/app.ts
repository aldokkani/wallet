import express from 'express'
import morgan from 'morgan'

const app = express()
const LOG_FORMAT = process.env['LOG_FORMAT'] ?? 'dev'

app.use(morgan(LOG_FORMAT))

app.get('/', (_req, res) => {
  res.send('Hello World!')
})

export default app
