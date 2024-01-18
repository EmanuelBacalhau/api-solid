import { PrismaUserRepository } from '@/repositories/prisma/prisma-users-repository'
import { AuthenticateUsersUseCase } from '../user/authenticate-users-use-case'

export function makeAuthenticateUsersUseCase() {
  const prismaUserRepository = new PrismaUserRepository()
  const authentucateUseCase = new AuthenticateUsersUseCase(prismaUserRepository)

  return authentucateUseCase
}
