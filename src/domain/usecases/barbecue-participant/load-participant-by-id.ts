import { ParticipantModel } from '@/domain/models/participant'

export interface LoadParticipantById {
  loadById (participantId: string): Promise<ParticipantModel>
}
