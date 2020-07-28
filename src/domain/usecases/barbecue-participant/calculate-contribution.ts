import { BarbecueModel } from '@/domain/models/barbecue'
import { ParticipantModel } from '@/domain/models/participant'

export interface calculateContribution {
  calculate (barbecue: BarbecueModel, participants: ParticipantModel[]): ParticipantModel[]
}
