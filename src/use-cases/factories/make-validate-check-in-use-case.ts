import { ValidateCheckInsUseCase } from '../check-in/validate-check-ins-use-case'
import { PrismaCheckInRepository } from '@/repositories/prisma/prisma-check-ins-repository'

export function makeValidateCheckInUseCase() {
  const repository = new PrismaCheckInRepository()
  const useCase = new ValidateCheckInsUseCase(repository)

  return useCase
}
