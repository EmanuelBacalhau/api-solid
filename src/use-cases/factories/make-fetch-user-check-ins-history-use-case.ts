import { FetchUserCheckInsHistoricUseCase } from '../check-in/fetch-user-check-ins-history-use-case'
import { PrismaCheckInRepository } from '@/repositories/prisma/prisma-check-ins-repository'

export function makeFetchUserCheckInsHistoryUseCase() {
  const repository = new PrismaCheckInRepository()
  const useCase = new FetchUserCheckInsHistoricUseCase(repository)

  return useCase
}
