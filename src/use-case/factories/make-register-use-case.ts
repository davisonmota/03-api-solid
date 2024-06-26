import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { RegisterUserUseCase } from '../register-user'

export function makeRegisterUseCase (): RegisterUserUseCase {
  const prismaUsersRepository = new PrismaUsersRepository()
  const registerUserUseCase = new RegisterUserUseCase(prismaUsersRepository)

  return registerUserUseCase
}
