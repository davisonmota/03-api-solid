import { hash } from 'bcryptjs'
import { type User, type UsersRepository } from '@/repositories/users-repository'
import { EmailAlreadyExistsError } from './erros/user-already-exists'

interface RegisterUserUseCaseRequest {
  name: string
  email: string
  password: string
}

export class RegisterUserUseCase {
  constructor (private readonly usersRepository: UsersRepository) {}

  async execute ({
    name,
    email,
    password
  }: RegisterUserUseCaseRequest): Promise<Omit<User, 'passwordHash'>> {
    const passwordHash = await hash(password, 12)

    const userWithEmail = await this.usersRepository.findByEmail(email)

    if (userWithEmail) {
      throw new EmailAlreadyExistsError()
    }

    const userData = await this.usersRepository.create({ name, email, passwordHash })
    return {
      id: userData.id,
      name: userData.name,
      email: userData.email
    }
  }
}
