import { BarbecueModel } from '@/domain/models/barbecue'
import { ParticipantModel } from '@/domain/models/participant'

export interface CalculateContribution {
  calculate (barbecue: BarbecueModel, participants: ParticipantModel[]): ParticipantModel[]
}
