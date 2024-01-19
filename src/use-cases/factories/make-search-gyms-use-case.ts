import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'
import { SearchGymsUseCase } from '../gym/search-gyms-use-case'

export function makeSearchRegisterGymsUseCase() {
  const repository = new PrismaGymsRepository()
  const useCase = new SearchGymsUseCase(repository)

  return useCase
}
