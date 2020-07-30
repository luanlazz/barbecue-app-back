import { SaveParticipant, SaveParticipantParams } from '@/domain/usecases/barbecue-participant/save-participant'
import { SaveParticipantRepository } from '@/data/protocols/db/barbecue-participant/db-save-participant'
import { ParticipantModel } from '@/domain/models/participant'

export class DbSaveParticipant implements SaveParticipant {
  constructor (
    private readonly saveParticipantRepository: SaveParticipantRepository
  ) {}

  async save (participant: SaveParticipantParams): Promise<ParticipantModel> {
    const participantSave = await this.saveParticipantRepository.save(participant)
    return participantSave
  }
}
