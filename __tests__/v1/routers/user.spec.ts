import request from 'supertest'
import app from '../../../src/app'
import * as db from '../../../src/db'

jest.mock('../../../src/db')

describe('/users', () => {
  const requestWithApp = request(app)

  afterAll(() => {
    jest.resetAllMocks()
    jest.resetAllMocks()
  })

  describe('/balance', () => {
    const routePath = '/api/v1/users/balance'

    it('returns user balance with the right permissions', async () => {
      (db.dbExec as jest.Mock).mockResolvedValueOnce({ rows: [{ expire: '1-1-2099' }] });
      (db.dbExec as jest.Mock).mockResolvedValueOnce({ rows: [{ userId: 123 }] });
      (db.dbExec as jest.Mock).mockResolvedValueOnce({ rows: [{ permissions: ['balance_read'] }] });
      (db.dbExec as jest.Mock).mockResolvedValueOnce({ rows: [{ balance: 0 }] })

      const res = await requestWithApp
        .get(routePath)
        .set('session-id', '123456')
      expect(res.body).toEqual({ balance: 0 })
      expect(res.status).toBe(200)
    })

    it('returns an error when no permission', async () => {
      const res = await requestWithApp.get(routePath)
      expect(res.status).toBe(401)
    })
  })
})
