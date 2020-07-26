import { SaveParticipant, SaveParticipantParams } from '@/domain/usecases/barbecue-participant/save-barbecue-participant'
import { ParticipantModel } from '@/domain/models/participant'
import { mockParticipantModel } from '@/domain/test'

export const mockSaveParticipant = (): SaveParticipant => {
  class SaveParticipantStub implements SaveParticipant {
    async save (participant: SaveParticipantParams): Promise<ParticipantModel[]> {
      return await Promise.resolve([mockParticipantModel()])
    }
  }
  return new SaveParticipantStub()
}
