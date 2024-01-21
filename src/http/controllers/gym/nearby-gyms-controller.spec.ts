import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import request from 'supertest'
import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('Nearby gyms controller (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to list nearby gyms', async () => {
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
        latitude: -7.2424675,
        longitude: -36.0660508,
      })

    const response = await request(app.server)
      .get('/gyms/nearby')
      .query({
        latitude: -7.2894063,
        longitude: -35.6114703,
      })
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.gyms).toEqual([
      expect.objectContaining({
        title: 'Rocketseat',
      }),
    ])
    expect(response.body.gyms).toHaveLength(1)
  })
})
