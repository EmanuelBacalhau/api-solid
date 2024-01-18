import { InMemorGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repositroy'
import { describe, it, expect, beforeEach } from 'vitest'
import { CreateGymsUseCase } from './create-gyms-use-case'

let gymsRepository: InMemorGymsRepository
let sut: CreateGymsUseCase

describe('Creaet gyms use case', () => {
  beforeEach(() => {
    gymsRepository = new InMemorGymsRepository()
    sut = new CreateGymsUseCase(gymsRepository)
  })

  it('should be able to create gym', async () => {
    const { gym } = await sut.execute({
      title: 'Fitfusion',
      description: '',
      phone: '',
      latitude: -7.2894063,
      longitude: -35.6114703,
    })

    expect(gym?.id).toEqual(expect.any(String))
  })
})
