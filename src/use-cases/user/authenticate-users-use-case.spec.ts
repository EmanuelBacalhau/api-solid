import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repositroy'
import { beforeEach, describe, expect, it } from 'vitest'
import { AuthenticateUsersUseCase } from './authenticate-users-use-case'
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from '../errors/inavalid-credentials-error'

let userRepository: InMemoryUsersRepository
let sut: AuthenticateUsersUseCase

describe('Authenticate use case', () => {
  beforeEach(() => {
    userRepository = new InMemoryUsersRepository()
    sut = new AuthenticateUsersUseCase(userRepository)
  })

  it('should be able to authenticate', async () => {
    await userRepository.create({
      name: 'John Doe',
      email: 'emanuel@gmail.com',
      password_hash: await hash('123456', 6),
    })

    const { user } = await sut.execute({
      email: 'emanuel5@gmail.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with wrong email', async () => {
    expect(() =>
      sut.execute({
        email: 'emanuel5@gmail.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    await userRepository.create({
      name: 'John Doe',
      email: 'johnDoe@gmail.com',
      password_hash: await hash('123456', 6),
    })

    expect(() =>
      sut.execute({
        email: 'johnDoe@gmail.com',
        password: '1234568',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
