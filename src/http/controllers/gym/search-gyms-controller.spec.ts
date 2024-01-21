import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import request from 'supertest'
import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('Search gyms controller (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to search gym', async () => {
    const { token } = await createAndAuthenticateUser(app, true)

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Rocketseat',
        description: 'Melhor curso br',
        phone: '1234578979',
        latitude: -7.2894063,
        longitude: -35.6114703,
      })

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'JS Academy',
        description: 'Hello world',
        phone: '56774578745',
        latitude: -7.2894063,
        longitude: -35.6114703,
      })

    const response = await request(app.server)
      .get('/gyms/search')
      .query({
        q: 'JS',
      })
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.gyms).toEqual([
      expect.objectContaining({
        title: 'JS Academy',
      }),
    ])
    expect(response.body.gyms).toHaveLength(1)
  })
})
