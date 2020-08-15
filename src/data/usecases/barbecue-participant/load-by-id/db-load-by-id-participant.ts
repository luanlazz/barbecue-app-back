import { LoadParticipantsByIdRepository } from '@/data/protocols/db'
import { LoadParticipantById } from '@/domain/usecases'
import { ParticipantModel } from '@/domain/models'

export class DbLoadParticipantById implements LoadParticipantById {
  constructor (
    private readonly loadParticipantsByIdRepository: LoadParticipantsByIdRepository
  ) {}

  async loadById (participantId: string): Promise<ParticipantModel> {
    const participant = await this.loadParticipantsByIdRepository.loadById(participantId)
    return participant
  }
}
