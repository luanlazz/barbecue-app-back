import { ParticipantModel } from '@/domain/models/participant'

export interface LoadParticipantsByBqRepository {
  load (barbecueId: string): Promise<ParticipantModel[]>
}
