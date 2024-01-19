import { FastifyInstance } from 'fastify'
import { registerUserController } from './controllers/user/register-users-controller'
import { authenticateUsersController } from './controllers/user/authenticate-users-controller'
import { profileUsersController } from './controllers/user/profile-users-controller'
import { verifyJwt } from './middlewares/verify-jwt'

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', registerUserController)
  app.post('/sessions', authenticateUsersController)

  /* Authenticated */
  app.get('/me', { onRequest: [verifyJwt] }, profileUsersController)
}
