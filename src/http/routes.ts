import { FastifyInstance } from 'fastify'
import { registerUserController } from './controllers/user/register-users-controller'
import { authenticateUsersController } from './controllers/user/authenticate-users-controller'

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', registerUserController)
  app.post('/sessions', authenticateUsersController)
}
