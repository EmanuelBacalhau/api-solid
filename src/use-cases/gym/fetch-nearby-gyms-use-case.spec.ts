import { InMemorGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repositroy'
import { describe, it, expect, beforeEach } from 'vitest'
import { FetchNearbyGymsUseCase } from './fetch-nearby-gyms-use-case'

let gymsRepository: InMemorGymsRepository
let sut: FetchNearbyGymsUseCase

describe('Fetch nearby gyms use case', () => {
  beforeEach(() => {
    gymsRepository = new InMemorGymsRepository()
    sut = new FetchNearbyGymsUseCase(gymsRepository)
  })

  it('should be able to fetch nearby gyms', async () => {
    await gymsRepository.create({
      title: 'Near Gym',
      description: '',
      phone: '',
      latitude: -7.2894063,
      longitude: -35.6114703,
    })
    await gymsRepository.create({
      title: 'Far Gym',
      description: '',
      phone: '',
      latitude: -7.2424675,
      longitude: -36.0660508,
    })

    const { gyms } = await sut.execute({
      userLatitude: -7.2894063,
      userLongitude: -35.6114703,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'Near Gym' })])
  })
})
