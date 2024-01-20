import { makeValidateCheckInUseCase } from '@/use-cases/factories/make-validate-check-in-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function validateCheckInsController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const createCheckInsParamsSchema = z.object({
    checkInId: z.string().uuid(),
  })

  const { checkInId } = createCheckInsParamsSchema.parse(request.params)

  const validateCheckInsUseCase = makeValidateCheckInUseCase()

  await validateCheckInsUseCase.execute({ checkInId })

  return reply.status(204).send()
}
