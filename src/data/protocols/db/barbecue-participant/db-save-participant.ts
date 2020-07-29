import { SaveParticipantParams, SaveParticipantReturn } from '@/domain/usecases/barbecue-participant/save-participant'

export interface SaveParticipantRepository {
  save(participant: SaveParticipantParams): Promise<SaveParticipantReturn>
}
