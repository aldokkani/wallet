import request from 'supertest'
import app from '../../../src/app'
import * as SessionModel from '../../../src/v1/models/session'
import * as UserModel from '../../../src/v1/models/user'

jest.mock('../../../src/v1/models/session')
jest.mock('../../../src/v1/models/user')

describe('/auth', () => {
  const requestWithApp = request(app)

  describe('/login', () => {
    const routePath = '/api/v1/auth/login'
    const sessionId = 123
    const password = '123456'

    it('logins in the user', async () => {
      (UserModel.findUserByEmail as jest.Mock).mockResolvedValue({ password });
      (SessionModel.createSession as jest.Mock).mockResolvedValue(sessionId)

      const res = await requestWithApp
        .post(routePath)
        .send({ email: 'john@example.com', password })
        .set('Accept', 'application/json')

      expect(res.status).toEqual(200)
      expect(res.body.sessionId).toEqual(sessionId)
    })

    it('returns error on wrong user credentials', async () => {
      (UserModel.findUserByEmail as jest.Mock).mockResolvedValue({ password })

      const res = await requestWithApp
        .post(routePath)
        .send({ email: 'john@example.com', password: 'wrong password' })
        .set('Accept', 'application/json')

      expect(res.status).toEqual(404)
      expect(res.body.message).toEqual('invalid email or password')
    })
  })

  describe('/logout', () => {
    // TODO: test logout
  })
})
