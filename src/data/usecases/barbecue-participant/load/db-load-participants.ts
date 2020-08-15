import { LoadParticipantsByBqRepository } from '@/data/protocols/db'
import { LoadParticipants } from '@/domain/usecases'
import { ParticipantModel } from '@/domain/models'

export class DbLoadParticipants implements LoadParticipants {
  constructor (
    private readonly loadParticipantsByBqRepository: LoadParticipantsByBqRepository
  ) {}

  async load (barbecueId: string): Promise<ParticipantModel[]> {
    const participants = await this.loadParticipantsByBqRepository.load(barbecueId)
    return participants
  }
}
