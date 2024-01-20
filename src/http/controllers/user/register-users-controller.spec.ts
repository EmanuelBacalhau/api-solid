import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import { app } from '@/app'
import request from 'supertest'

describe('Register users controller', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to register user', async () => {
    const response = await request(app.server).post('/users').send({
      name: 'John Doe',
      email: 'johnDoe@gmail.com',
      password: '123456789',
    })

    expect(response.status).toEqual(201)
  })
})
