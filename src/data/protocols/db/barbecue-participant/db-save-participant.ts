import { SaveParticipantParams } from '@/domain/usecases/barbecue-participant/save-barbecue-participant'
import { ParticipantModel } from '@/domain/models/participant'

export interface SaveParticipantRepository {
  save(participant: SaveParticipantParams): Promise<ParticipantModel[]>
}
