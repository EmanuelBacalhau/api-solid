import { PrismaUserRepository } from '@/repositories/prisma/prisma-users-repository'
import { RegisterUserUseCase } from '../user/register-users-use-case'

export function makeRegisterUsersUseCase() {
  const prismaUserRepository = new PrismaUserRepository()
  const registerUsersUseCase = new RegisterUserUseCase(prismaUserRepository)

  return registerUsersUseCase
}
