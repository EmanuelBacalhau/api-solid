import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest'
import { CheckInUseCase } from './check-in-use-case'
import { InMemoryCheckInRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { InMemorGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repositroy'
import { Decimal } from '@prisma/client/runtime/library'
import { MaxNumberOfCheckInsError } from '../errors/max-number-of-check-ins-error'
import { MaxDistanceError } from '../errors/max-distance-error'

let checkInRepository: InMemoryCheckInRepository
let gymsRepository: InMemorGymsRepository
let sut: CheckInUseCase

describe('Check in use case', () => {
  beforeEach(async () => {
    checkInRepository = new InMemoryCheckInRepository()
    gymsRepository = new InMemorGymsRepository()
    sut = new CheckInUseCase(checkInRepository, gymsRepository)

    await gymsRepository.create({
      id: 'gym-10',
      title: 'JavaScript Gym',
      description: '',
      latitude: -7.2894063,
      longitude: -35.6114703,
      phone: '',
    })

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to check-in', async () => {
    const { checkIn } = await sut.execute({
      gymId: 'gym-10',
      userId: 'user-01',
      userLatitude: -7.2894063,
      userLongitude: -35.6114703,
    })
    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check-in twice in the same day', async () => {
    vi.setSystemTime(new Date(2024, 0, 18, 8, 0, 0))

    await sut.execute({
      gymId: 'gym-10',
      userId: 'user-01',
      userLatitude: -7.2894063,
      userLongitude: -35.6114703,
    })

    await expect(() =>
      sut.execute({
        gymId: 'gym-10',
        userId: 'user-01',
        userLatitude: -7.2894063,
        userLongitude: -35.6114703,
      }),
    ).rejects.toBeInstanceOf(MaxNumberOfCheckInsError)
  })

  it('should be able to check-in twice but in different days', async () => {
    vi.setSystemTime(new Date(2024, 0, 18, 8, 0, 0))

    await sut.execute({
      gymId: 'gym-10',
      userId: 'user-01',
      userLatitude: -7.2894063,
      userLongitude: -35.6114703,
    })

    vi.setSystemTime(new Date(2024, 0, 19, 8, 0, 0))

    const { checkIn } = await sut.execute({
      gymId: 'gym-10',
      userId: 'user-01',
      userLatitude: -7.2894063,
      userLongitude: -35.6114703,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check-in on distant gym', async () => {
    await gymsRepository.create({
      id: 'gym-11',
      title: 'JavaScript Gym',
      description: '',
      latitude: new Decimal(-7.2894063),
      longitude: new Decimal(-35.6114703),
      phone: '',
    })

    await expect(() =>
      sut.execute({
        gymId: 'gym-11',
        userId: 'user-01',
        userLatitude: -7.3092386,
        userLongitude: -35.5956018,
      }),
    ).rejects.toBeInstanceOf(MaxDistanceError)
  })
})
