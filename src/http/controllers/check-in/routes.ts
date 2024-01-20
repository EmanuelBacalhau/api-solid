import { FastifyInstance } from 'fastify'
import { verifyJwt } from '@/http/middlewares/verify-jwt'
import { createGymsController } from '../gym/create-gyms-controller'
import { validateCheckInsController } from './validate-check-ins-controller'
import { historyCheckInsController } from './history-check-ins-controller'
import { metricsCheckInsController } from './metrics-check-ins-controller'

export async function checkInsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwt)

  app.post('/gyms/:gymId/check-ins', createGymsController)
  app.patch('/check-ins/:checkInId/validate', validateCheckInsController)

  app.get('/check-ins/history', historyCheckInsController)
  app.get('/check-ins/metrics', metricsCheckInsController)
}
