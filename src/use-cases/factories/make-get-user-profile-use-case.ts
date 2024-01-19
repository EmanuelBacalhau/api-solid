import { PrismaUserRepository } from '@/repositories/prisma/prisma-users-repository'
import { GetUserProfileUseCase } from '../user/get-user-profile-use-case'

export function makeGetUserProfileUseCase() {
  const repository = new PrismaUserRepository()
  const useCase = new GetUserProfileUseCase(repository)

  return useCase
}
