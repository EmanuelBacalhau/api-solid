import { PrismaCheckInRepository } from '@/repositories/prisma/prisma-check-ins-repository'
import { CheckInUseCase } from '../check-in/check-in-use-case'
import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'

export function makeCheckInUseCase() {
  const checkInRepository = new PrismaCheckInRepository()
  const gymRepository = new PrismaGymsRepository()
  const useCase = new CheckInUseCase(checkInRepository, gymRepository)

  return useCase
}
