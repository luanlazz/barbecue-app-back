import { SaveParticipant, SaveParticipantParams } from '@/domain/usecases/barbecue-participant/save-barbecue-participant'
import { ParticipantModel } from '@/domain/models/participant'
import { mockParticipantsModel } from '@/domain/test'
import { LoadParticipants } from '@/domain/usecases/barbecue-participant/load-barbecue-participants'

export const mockSaveParticipant = (): SaveParticipant => {
  class SaveParticipantStub implements SaveParticipant {
    async save (participant: SaveParticipantParams): Promise<ParticipantModel[]> {
      return await Promise.resolve(mockParticipantsModel())
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
