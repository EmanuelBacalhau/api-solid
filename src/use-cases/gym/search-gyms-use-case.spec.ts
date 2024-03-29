import { InMemorGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repositroy'
import { describe, it, expect, beforeEach } from 'vitest'
import { SearchGymsUseCase } from './search-gyms-use-case'

let gymsRepository: InMemorGymsRepository
let sut: SearchGymsUseCase

describe('Search gyms use case', () => {
  beforeEach(() => {
    gymsRepository = new InMemorGymsRepository()
    sut = new SearchGymsUseCase(gymsRepository)
  })

  it('should be able to search by gyms', async () => {
    await gymsRepository.create({
      title: 'JavaScript Gym',
      description: '',
      phone: '',
      latitude: -7.2894063,
      longitude: -35.6114703,
    })
    await gymsRepository.create({
      title: 'TypeScript Gym',
      description: '',
      phone: '',
      latitude: -7.2894063,
      longitude: -35.6114703,
    })

    const { gyms } = await sut.execute({
      query: 'JavaScript',
      page: 1,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'JavaScript Gym' })])
  })

  it('should be able to fetch paginated gyms search', async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        title: `JavaScript Gym ${i}`,
        description: '',
        phone: '',
        latitude: -7.2894063,
        longitude: -35.6114703,
      })
    }

    const { gyms } = await sut.execute({
      query: 'JavaScript',
      page: 2,
    })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'JavaScript Gym 21' }),
      expect.objectContaining({ title: 'JavaScript Gym 22' }),
    ])
  })
})
