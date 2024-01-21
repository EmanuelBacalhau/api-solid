import { prisma } from '@/libs/prisma'
import { hash } from 'bcryptjs'
import { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function createAndAuthenticateUser(
  app: FastifyInstance,
  isAdmin = false,
) {
  await prisma.user.create({
    data: {
      name: 'John Doe',
      email: 'johnDoe@gmail.com',
      password_hash: await hash('123456789', 6),
      role: isAdmin ? 'ADMIN' : 'MEMBER',
    },
  })

  const authResponse = await request(app.server).post('/sessions').send({
    email: 'johnDoe@gmail.com',
    password: '123456789',
  })

  const { token } = authResponse.body

  return { token }
}
