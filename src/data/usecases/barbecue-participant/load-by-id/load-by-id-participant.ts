import { LoadParticipantsByIdRepository } from '@/data/protocols/db/barbecue-participant/db-load-participants-by-id'
import { LoadParticipantById } from '@/domain/usecases/barbecue-participant/load-participant-by-id'
import { ParticipantModel } from '@/domain/models/participant'

export class DbLoadParticipantById implements LoadParticipantById {
  constructor (
    private readonly loadParticipantsByIdRepository: LoadParticipantsByIdRepository
  ) {}

  async loadById (participantId: string): Promise<ParticipantModel> {
    await this.loadParticipantsByIdRepository.loadById(participantId)
    return null
  }
}
