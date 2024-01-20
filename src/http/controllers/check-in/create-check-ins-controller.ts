import { makeCheckInUseCase } from '@/use-cases/factories/make-check-ins-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function createCheckInsController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const createCheckInsBodySchema = z.object({
    userLatitude: z.coerce.number().refine((value) => {
      return Math.abs(value) <= 90
    }),
    userLongitude: z.coerce.number().refine((value) => {
      return Math.abs(value) <= 180
    }),
  })

  const createCheckInsParamsSchema = z.object({
    gymId: z.string().uuid(),
  })

  const { gymId } = createCheckInsParamsSchema.parse(request.params)
  const { userLatitude, userLongitude } = createCheckInsBodySchema.parse(
    request.body,
  )

  const createCheckInsUseCase = makeCheckInUseCase()

  await createCheckInsUseCase.execute({
    userId: request.user.sub,
    gymId,
    userLatitude,
    userLongitude,
  })

  return reply.status(201).send()
}
