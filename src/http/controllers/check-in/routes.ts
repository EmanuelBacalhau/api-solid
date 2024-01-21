import { FastifyInstance } from 'fastify'
import { verifyJwt } from '@/http/middlewares/verify-jwt'
import { validateCheckInsController } from './validate-check-ins-controller'
import { historyCheckInsController } from './history-check-ins-controller'
import { metricsCheckInsController } from './metrics-check-ins-controller'
import { createCheckInsController } from './create-check-ins-controller'
import { verifyUserRole } from '@/http/middlewares/verify-user-role'

export async function checkInsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwt)

  app.post('/gyms/:gymId/check-ins', createCheckInsController)
  app.patch(
    '/check-ins/:checkInId/validate',
    { onRequest: [verifyUserRole('ADMIN')] },
    validateCheckInsController,
  )

  app.get('/check-ins/history', historyCheckInsController)
  app.get('/check-ins/metrics', metricsCheckInsController)
}
