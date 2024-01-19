import { PrismaUserRepository } from '@/repositories/prisma/prisma-users-repository'
import { RegisterUserUseCase } from '../user/register-users-use-case'

export function makeRegisterUsersUseCase() {
  const repository = new PrismaUserRepository()
  const useCase = new RegisterUserUseCase(repository)

  return useCase
}
