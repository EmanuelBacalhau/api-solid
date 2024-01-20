import { FastifyInstance } from 'fastify'
import { verifyJwt } from '@/http/middlewares/verify-jwt'
import { createGymsController } from './create-gyms-controller'
import { searchGymsController } from './search-gyms-controller'
import { nearbyGymsController } from './nearby-gyms-controller'

export async function gymsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwt)

  app.post('/gyms', createGymsController)

  app.get('/gyms/search', searchGymsController)
  app.get('/gyms/nearby', nearbyGymsController)
}
