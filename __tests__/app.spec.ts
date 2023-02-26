import request from 'supertest'
import app from '../src/app'

describe('app', () => {
  const requestWithApp = request(app)

  it('handles unknown routes', async () => {
    const res = await requestWithApp.get('/')
    expect(res.status).toEqual(404)
    expect(res.body.message).toEqual('404 NOT FOUND')
  })

  it.skip('catches all server errors', async () => {
    const res = await requestWithApp.get('/')
    expect(res.status).toEqual(500)
    expect(res.body.message).toEqual('Server internal error')
  })
})
