import { ParticipantModel } from '@/domain/models/participant'

export interface RemoveParticipantRepository {
  remove (barbecueId: string, participantId: string): Promise<ParticipantModel[]>
}
