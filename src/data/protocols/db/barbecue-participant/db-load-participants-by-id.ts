import { ParticipantModel } from '@/domain/models/participant'

export interface LoadParticipantsByIdRepository {
  loadById (participantId: string): Promise<ParticipantModel>
}
