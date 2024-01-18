import { expect, describe, it } from 'vitest'
import { RegisterUserUseCase } from './register-users-use-case'
import { compare } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repositroy'
import { UserAlreadyExistsError } from '../errors/user-already-exists-error'

describe('User register use case', () => {
  it('should be able register', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const registerUseCase = new RegisterUserUseCase(usersRepository)

    const { user } = await registerUseCase.execute({
      name: 'John Doe',
      email: 'johnDoe@gmail.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should test email if it is unique', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const registerUseCase = new RegisterUserUseCase(usersRepository)

    const email = 'johnDoe@gmail.com'

    await registerUseCase.execute({
      name: 'John Doe',
      email,
      password: '123456',
    })

    expect(() =>
      registerUseCase.execute({
        name: 'John Doe',
        email,
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })

  it('should hash user password upon registration', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const registerUseCase = new RegisterUserUseCase(usersRepository)

    const { user } = await registerUseCase.execute({
      name: 'John Doe',
      email: 'johnDoe@gmail.com',
      password: '123456',
    })

    const isPasswordCorretlyHashed = await compare('123456', user.password_hash)

    expect(isPasswordCorretlyHashed).toBe(true)
  })
})
