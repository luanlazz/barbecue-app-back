import { SaveParticipant, SaveParticipantParams } from '@/domain/usecases/barbecue-participant/save-participant'
import { ParticipantModel } from '@/domain/models/participant'
import { mockParticipantsModel, mockParticipantModel } from '@/domain/test'
import { LoadParticipants } from '@/domain/usecases/barbecue-participant/load-participants'
import { LoadParticipantById } from '@/domain/usecases/barbecue-participant/load-participant-by-id'
import { RemoveParticipant } from '@/domain/usecases/barbecue-participant/remove-participant'

export const mockSaveParticipant = (): SaveParticipant => {
  class SaveParticipantStub implements SaveParticipant {
    async save (participant: SaveParticipantParams): Promise<ParticipantModel> {
      return await Promise.resolve(mockParticipantModel())
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

export const mockLoadParticipantById = (): LoadParticipantById => {
  class LoadParticipantsStub implements LoadParticipantById {
    async loadById (participantId: string): Promise<ParticipantModel> {
      return await Promise.resolve(mockParticipantModel())
    }
  }
  return new LoadParticipantsStub()
}

export const mockRemoveParticipant = (): RemoveParticipant => {
  class RemoveParticipantStub implements RemoveParticipant {
    async remove (barbecueId: string, participantId: string): Promise<boolean> {
      return await Promise.resolve(true)
    }
  }
  return new RemoveParticipantStub()
}
