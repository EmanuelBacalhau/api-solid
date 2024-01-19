import { PrismaUserRepository } from '@/repositories/prisma/prisma-users-repository'
import { AuthenticateUsersUseCase } from '../user/authenticate-users-use-case'

export function makeAuthenticateUsersUseCase() {
  const repository = new PrismaUserRepository()
  const useCase = new AuthenticateUsersUseCase(repository)

  return useCase
}
