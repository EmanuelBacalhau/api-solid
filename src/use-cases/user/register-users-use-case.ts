import { UserRepository } from '@/repositories/interfaces/users-repository'
import { hash } from 'bcryptjs'
import { UserAlreadyExistsError } from '../errors/user-already-exists-error'

interface RegisterUserUseCaseRequest {
  name: string
  email: string
  password: string
}

export class RegisterUserUseCase {
  constructor(private registerUserRepository: UserRepository) {}
  async execute({ email, name, password }: RegisterUserUseCaseRequest) {
    const emailInUse = await this.registerUserRepository.findByEmail(email)

    if (emailInUse) {
      throw new UserAlreadyExistsError()
    }

    const password_hash = await hash(password, 6)

    const user = await this.registerUserRepository.create({
      email,
      name,
      password_hash,
    })

    return {
      user,
    }
  }
}
