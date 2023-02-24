import request from 'supertest'
import app from '../src/app'

describe('index', () => {
  const requestWithApp = request(app)

  it('GET /', async () => {
    const res = await requestWithApp.get('/')
    expect(res.status).toEqual(200)
  })
})
