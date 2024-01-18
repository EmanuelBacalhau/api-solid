import { expect, describe, it, beforeEach } from 'vitest'
import { RegisterUserUseCase } from './register-users-use-case'
import { compare } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repositroy'
import { UserAlreadyExistsError } from '../errors/user-already-exists-error'

let userRepository: InMemoryUsersRepository
let sut: RegisterUserUseCase

describe('User register use case', () => {
  beforeEach(() => {
    userRepository = new InMemoryUsersRepository()
    sut = new RegisterUserUseCase(userRepository)
  })

  it('should be able register', async () => {
    const { user } = await sut.execute({
      name: 'John Doe',
      email: 'johnDoe@gmail.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should test email if it is unique', async () => {
    const email = 'johnDoe@gmail.com'

    await sut.execute({
      name: 'John Doe',
      email,
      password: '123456',
    })

    await expect(() =>
      sut.execute({
        name: 'John Doe',
        email,
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })

  it('should hash user password upon registration', async () => {
    const { user } = await sut.execute({
      name: 'John Doe',
      email: 'johnDoe@gmail.com',
      password: '123456',
    })

    const isPasswordCorretlyHashed = await compare('123456', user.password_hash)

    expect(isPasswordCorretlyHashed).toBe(true)
  })
})
