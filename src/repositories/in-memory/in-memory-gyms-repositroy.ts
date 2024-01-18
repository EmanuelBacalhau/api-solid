import { Gym } from '@prisma/client'
import { GymsRepository } from '../interfaces/gyms-repository'

export class InMemorGymsRepository implements GymsRepository {
  public items: Gym[] = []

  async findById(gymId: string) {
    const gym = this.items.find((item) => (item.id = gymId))

    if (!gym) {
      return null
    }

    return gym
  }
}
