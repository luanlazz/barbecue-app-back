import { SaveParticipantParams } from '@/domain/usecases/barbecue-participant/save-participant'

export interface SaveParticipantRepository {
  save(participant: SaveParticipantParams): Promise<number>
}
