import { UserRepository } from '@/repositories/interfaces/users-repository'
import { InvalidCredentialsError } from '../errors/inavalid-credentials-error'
import { compare } from 'bcryptjs'
import { User } from '@prisma/client'

interface AuthenticateUsersUseCaseRequest {
  email: string
  password: string
}

interface AuthenticateUsersUseCaseResponse {
  user: User
}

export class AuthenticateUsersUseCase {
  constructor(private usersRepostory: UserRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateUsersUseCaseRequest): Promise<AuthenticateUsersUseCaseResponse> {
    const user = await this.usersRepostory.findByEmail(email)

    if (!user) {
      throw new InvalidCredentialsError()
    }

    const doesPasswordMatches = await compare(password, user.password_hash)

    if (!doesPasswordMatches) {
      throw new InvalidCredentialsError()
    }

    return {
      user,
    }
  }
}
