import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repositroy'
import { describe, it, expect, beforeEach } from 'vitest'
import { GetUserProfileUseCase } from './get-user-profile-use-case'
import { hash } from 'bcryptjs'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

let userRepository: InMemoryUsersRepository
let sut: GetUserProfileUseCase

describe('Get user profile use case', () => {
  beforeEach(() => {
    userRepository = new InMemoryUsersRepository()
    sut = new GetUserProfileUseCase(userRepository)
  })

  it('should return data fot the user profile with wrong id', async () => {
    const createdUser = await userRepository.create({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password_hash: await hash('123456', 6),
    })

    const { user } = await sut.execute({ userId: createdUser.id })

    expect(user.name).toEqual('John Doe')
  })

  it('should not return data fot the user profile with wrong id', async () => {
    expect(() =>
      sut.execute({ userId: 'non-existing-id' }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
