import { Router } from 'express'

const authRouter = Router()

authRouter.post('/login', (req, res) => {
  console.log(req.body)
})

export default authRouter
