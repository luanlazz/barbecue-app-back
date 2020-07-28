import { ParticipantModel } from '@/domain/models/participant'

export interface LoadParticipants {
  load (barbecueId: string): Promise<ParticipantModel[]>
}
