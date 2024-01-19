import { GetUserMetricsUseCase } from '../check-in/get-user-metrics-use-case'
import { PrismaCheckInRepository } from '@/repositories/prisma/prisma-check-ins-repository'

export function makeGetUserMetricsUseCase() {
  const repository = new PrismaCheckInRepository()
  const useCase = new GetUserMetricsUseCase(repository)

  return useCase
}
