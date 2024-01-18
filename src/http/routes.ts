import { FastifyInstance } from 'fastify'
import { registerUserController } from './controllers/user/register-users-controller'

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', registerUserController)
}
