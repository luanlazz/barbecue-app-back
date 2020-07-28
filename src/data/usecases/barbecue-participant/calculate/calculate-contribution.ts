import { calculateContribution } from '@/domain/usecases/barbecue-participant/calculate-contribution'
import { ParticipantModel } from '@/domain/models/participant'
import { BarbecueModel } from '@/domain/models/barbecue'

export class CalculateContribution implements calculateContribution {
  calculate (barbecue: BarbecueModel, participants: ParticipantModel[]): ParticipantModel[] {
    return null
  }
}
