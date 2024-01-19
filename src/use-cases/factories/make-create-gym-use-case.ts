import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'
import { CreateGymsUseCase } from '../gym/create-gyms-use-case'

export function makeCreateGymUseCase() {
  const repository = new PrismaGymsRepository()
  const useCase = new CreateGymsUseCase(repository)

  return useCase
}
