import { UserRepository } from '@/repositories/interfaces/users-repository'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

interface GetUserProfileUseCaseRequest {
  userId: string
}

export class GetUserProfileUseCase {
  constructor(private usersRepostory: UserRepository) {}

  async execute({ userId }: GetUserProfileUseCaseRequest) {
    const user = await this.usersRepostory.findById(userId)

    if (!user) {
      throw new ResourceNotFoundError()
    }

    return {
      user,
    }
  }
}
