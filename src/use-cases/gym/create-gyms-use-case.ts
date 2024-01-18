import { GymsRepository } from '@/repositories/interfaces/gyms-repository'

interface CreateGymsUseCaseRequest {
  title: string
  description?: string
  phone?: string
  latitude: number
  longitude: number
}

export class CreateGymsUseCase {
  constructor(private gymRepository: GymsRepository) {}
  async execute({
    title,
    description,
    phone,
    latitude,
    longitude,
  }: CreateGymsUseCaseRequest) {
    const gym = await this.gymRepository.create({
      title,
      description,
      phone,
      latitude,
      longitude,
    })

    return {
      gym,
    }
  }
}
