import { SaveParticipant, SaveParticipantParams, SaveParticipantReturn } from '@/domain/usecases/barbecue-participant/save-participant'
import { ParticipantModel } from '@/domain/models/participant'
import { mockParticipantsModel } from '@/domain/test'
import { LoadParticipants } from '@/domain/usecases/barbecue-participant/load-participants'
import { RemoveParticipant } from '@/domain/usecases/barbecue-participant/remove-participant'

export const mockSaveParticipant = (): SaveParticipant => {
  class SaveParticipantStub implements SaveParticipant {
    async save (participant: SaveParticipantParams): Promise<SaveParticipantReturn> {
      return await Promise.resolve({
        oldParticipant: null,
        status: true
      })
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

export const mockRemoveParticipant = (): RemoveParticipant => {
  class RemoveParticipantStub implements RemoveParticipant {
    async remove (barbecueId: string, participantId: string): Promise<number> {
      return await Promise.resolve(1)
    }
  }
  return new RemoveParticipantStub()
}
