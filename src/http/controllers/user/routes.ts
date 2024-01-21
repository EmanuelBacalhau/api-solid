import { FastifyInstance } from 'fastify'
import { registerUserController } from './register-users-controller'
import { authenticateUsersController } from './authenticate-users-controller'
import { profileUsersController } from './profile-users-controller'
import { verifyJwt } from '@/http/middlewares/verify-jwt'
import { refreshTokenUsersController } from './refresh-token-users-controller'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/users', registerUserController)
  app.post('/sessions', authenticateUsersController)

  app.patch('/token/refresh', refreshTokenUsersController)
  /* Authenticated */
  app.get('/me', { onRequest: [verifyJwt] }, profileUsersController)
}
