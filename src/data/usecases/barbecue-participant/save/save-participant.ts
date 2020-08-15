import { SaveParticipantRepository } from '@/data/protocols/db'
import { SaveParticipant, SaveParticipantParams } from '@/domain/usecases'
import { ParticipantModel } from '@/domain/models'

export class DbSaveParticipant implements SaveParticipant {
  constructor (
    private readonly saveParticipantRepository: SaveParticipantRepository
  ) {}

  async save (participant: SaveParticipantParams): Promise<ParticipantModel> {
    const participantSave = await this.saveParticipantRepository.save(participant)
    return participantSave
  }
}
