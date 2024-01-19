import { CheckIn, Prisma } from '@prisma/client'

export interface CheckInsRepository {
  findById(checkInDate: string): Promise<CheckIn | null>
  create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>
  save(checkIn: CheckIn): Promise<CheckIn>
  findByUserIdOnDate(userId: string, date: Date): Promise<CheckIn | null>
  findManyByUserId(userId: string, page: number): Promise<CheckIn[]>
  countByUserCheckIns(userId: string): Promise<number>
}
