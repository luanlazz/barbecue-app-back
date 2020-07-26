import { SaveParticipantRepository } from '@/data/protocols/db/barbecue-participant/db-save-participant'
import { SaveParticipantParams } from '@/domain/usecases/barbecue-participant/save-barbecue-participant'
import { ParticipantModel } from '@/domain/models/participant'
import { mockParticipantModel } from '@/domain/test/mock-participant'

export const mockSaveParticipantRepository = (): SaveParticipantRepository => {
  class SaveParticipantRepositoryStub implements SaveParticipantRepository {
    async save (participant: SaveParticipantParams): Promise<ParticipantModel[]> {
      return Promise.resolve([mockParticipantModel()])
    }
  }
  return new SaveParticipantRepositoryStub()
}
