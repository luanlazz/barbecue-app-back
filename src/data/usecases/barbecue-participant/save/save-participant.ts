import { SaveParticipant, SaveParticipantParams } from '@/domain/usecases/barbecue-participant/save-participant'
import { SaveParticipantRepository } from '@/data/protocols/db/barbecue-participant/db-save-participant'

export class DbSaveParticipant implements SaveParticipant {
  constructor (
    private readonly saveParticipantRepository: SaveParticipantRepository
  ) {}

  async save (participant: SaveParticipantParams): Promise<boolean> {
    const result = await this.saveParticipantRepository.save(participant)
    return !!result
  }
}
