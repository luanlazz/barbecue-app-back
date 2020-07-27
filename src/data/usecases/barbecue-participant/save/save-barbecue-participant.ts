import { SaveParticipant, SaveParticipantParams } from '@/domain/usecases/barbecue-participant/save-barbecue-participant'
import { SaveParticipantRepository } from '@/data/protocols/db/barbecue-participant/db-save-participant'
import { LoadParticipantsByBqRepository } from '@/data/protocols/db/barbecue-participant/db-load-participants-by-bq'
import { ParticipantModel } from '@/domain/models/participant'

export class DbSaveParticipant implements SaveParticipant {
  constructor (
    private readonly saveParticipantRepository: SaveParticipantRepository,
    private readonly loadParticipantsByBqRepository: LoadParticipantsByBqRepository
  ) {}

  async save (participant: SaveParticipantParams): Promise<ParticipantModel[]> {
    await this.saveParticipantRepository.save(participant)
    const participants = await this.loadParticipantsByBqRepository.load(participant.barbecueId)
    return participants
  }
}
