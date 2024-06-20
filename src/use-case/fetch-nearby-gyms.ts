import { type Gym, type GymsRepository } from '@/repositories/gyms-repository'

interface Input {
  userLatitude: number
  userLongitude: number
}

interface Output {
  gyms: Gym[]
}

export class FetchNearbyGymsUseCase {
  constructor (private readonly gymsRepository: GymsRepository) {}

  async execute ({ userLatitude, userLongitude }: Input): Promise<Output> {
    const gyms = await this.gymsRepository.findManyNearby({
      latitude: userLatitude,
      longitude: userLongitude
    })

    return {
      gyms
    }
  }
}
