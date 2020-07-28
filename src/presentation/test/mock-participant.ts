import { SaveParticipant, SaveParticipantParams } from '@/domain/usecases/barbecue-participant/save-participant'
import { ParticipantModel } from '@/domain/models/participant'
import { mockParticipantsModel } from '@/domain/test'
import { LoadParticipants } from '@/domain/usecases/barbecue-participant/load-participants'
import { CalculateContribution } from '@/domain/usecases/barbecue-participant/calculate-contribution'
import { BarbecueModel } from '@/domain/models/barbecue'

export const mockSaveParticipant = (): SaveParticipant => {
  class SaveParticipantStub implements SaveParticipant {
    async save (participant: SaveParticipantParams): Promise<void> {
      return await Promise.resolve()
    }
  }
  return new SaveParticipantStub()
}

export const mockLoadParticipants = (): LoadParticipants => {
  class LoadParticipantsStub implements LoadParticipants {
    async load (barbecueId: string): Promise<ParticipantModel[]> {
      return await Promise.resolve(mockParticipantsModel())
    }
  }
  return new LoadParticipantsStub()
}

export const mockCalculateContribution = (): CalculateContribution => {
  class CalculateContributionStub implements CalculateContribution {
    calculate (barbecue: BarbecueModel, participants: ParticipantModel[]): ParticipantModel[] {
      return mockParticipantsModel()
    }
  }
  return new CalculateContributionStub()
}
