import { SaveParticipant, SaveParticipantParams } from '@/domain/usecases/barbecue-participant/save-barbecue-participant'
import { SaveParticipantRepository } from '@/data/protocols/db/barbecue-participant/db-save-participant'
import { ParticipantModel } from '@/domain/models/participant'

export class DbSaveParticipant implements SaveParticipant {
  constructor (private readonly saveParticipantRepository: SaveParticipantRepository) {}

  async save (participant: SaveParticipantParams): Promise<ParticipantModel[]> {
    const participants = await this.saveParticipantRepository.save(participant)
    return participants
  }
}
