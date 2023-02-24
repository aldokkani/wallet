import dotenv from 'dotenv'
dotenv.config()

// eslint-disable-next-line import/first
import app from './app'

const PORT = process.env['PORT'] ?? 8000

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`)
})
