import { ParticipantModel } from '@/domain/models/participant'

export interface RemoveParticipant {
  remove(barbecueId: string, participantId: string): Promise<ParticipantModel[]>
}
