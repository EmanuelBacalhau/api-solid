import { Gym, Prisma } from '@prisma/client'
import { GymsRepository } from '../interfaces/gyms-repository'
import { randomUUID } from 'crypto'
import { Decimal } from '@prisma/client/runtime/library'

export class InMemorGymsRepository implements GymsRepository {
  public items: Gym[] = []

  async create(data: Prisma.GymCreateInput) {
    const gym = {
      id: data.id ?? randomUUID(),
      latitude: new Decimal(data.latitude.toString()),
      longitude: new Decimal(data.longitude.toString()),
      title: data.title,
      description: data.description ?? null,
      phone: data.phone ?? null,
      created_at: new Date(),
    }

    this.items.push(gym)

    return gym
  }

  async findById(gymId: string) {
    const gym = this.items.find((item) => (item.id = gymId))

    if (!gym) {
      return null
    }

    return gym
  }
}
