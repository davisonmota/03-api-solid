import fastifyJwt from '@fastify/jwt'
import fastify from 'fastify'
import { ZodError } from 'zod'
import { env } from './env'
import { appRoutes } from './http/routes'

const app = fastify()

app.register(fastifyJwt, {
  secret: env.JWT_SECRET
})

app.register(appRoutes)

app.setErrorHandler((error, request, replay) => {
  if (error instanceof ZodError) {
    return replay.status(400).send({ message: 'Validation error.', issues: error.format() })
  }

  if (env.NODE_ENV !== 'prod') {
    console.error(error)
  } else {
    // TODO: log an external toll like DataDog
  }

  return replay.status(500).send({ Error: 'Internal server Error' })
})

export { app }
