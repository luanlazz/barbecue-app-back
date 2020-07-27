import { SaveParticipantParams } from '@/domain/usecases/barbecue-participant/save-barbecue-participant'

export interface SaveParticipantRepository {
  save(participant: SaveParticipantParams): Promise<void>
}
