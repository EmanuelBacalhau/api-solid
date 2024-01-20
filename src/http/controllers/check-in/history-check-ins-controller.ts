import { makeFetchUserCheckInsHistoryUseCase } from '@/use-cases/factories/make-fetch-user-check-ins-history-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function historyCheckInsController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const checkInsHistoryQuerySchema = z.object({
    page: z.coerce.number().min(1).default(1),
  })

  const { page } = checkInsHistoryQuerySchema.parse(request.query)

  const historyCheckInsUseCase = makeFetchUserCheckInsHistoryUseCase()

  const { checkIns } = await historyCheckInsUseCase.execute({
    userId: request.user.sub,
    page,
  })

  return reply.status(200).send(checkIns)
}
