import { makeCreateGymUseCase } from '@/use-cases/factories/make-create-gym-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function createGymsController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const creteBodySchema = z.object({
    title: z.string(),
    description: z.string().nullable(),
    latitude: z.number().refine((value) => {
      return Math.abs(value) <= 90
    }),
    longitude: z.number().refine((value) => {
      return Math.abs(value) <= 180
    }),
    phone: z.string().nullable(),
  })

  const { title, description, latitude, longitude, phone } =
    creteBodySchema.parse(request.body)

  const registerGymsUseCase = makeCreateGymUseCase()

  await registerGymsUseCase.execute({
    title,
    description: description ?? undefined,
    latitude,
    longitude,
    phone: phone ?? undefined,
  })

  return reply.status(201).send()
}
