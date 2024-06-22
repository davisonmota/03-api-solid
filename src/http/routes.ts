import { type FastifyInstance } from 'fastify'
import { authenticate } from './controllers/authenticate'
import { profile } from './controllers/profile'
import { registerUser } from './controllers/register-user'

export async function appRoutes (app: FastifyInstance): Promise<void> {
  app.post('/users', registerUser)
  app.post('/sessions', authenticate)

  /** Authenticated */
  app.get('/me', profile)
}
