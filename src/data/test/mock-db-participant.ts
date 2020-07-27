import { SaveParticipantRepository } from '@/data/protocols/db/barbecue-participant/db-save-participant'
import { LoadParticipantsByBqRepository } from '@/data/protocols/db/barbecue-participant/db-load-participants-by-bq'
import { SaveParticipantParams } from '@/domain/usecases/barbecue-participant/save-barbecue-participant'
import { ParticipantModel } from '@/domain/models/participant'
import { mockParticipantModel } from '@/domain/test/mock-participant'

export const mockSaveParticipantRepository = (): SaveParticipantRepository => {
  class SaveParticipantRepositoryStub implements SaveParticipantRepository {
    async save (participant: SaveParticipantParams): Promise<void> {
      return Promise.resolve()
    }
  }
  return new SaveParticipantRepositoryStub()
}

export const mockLoadParticipantByBqRepository = (): LoadParticipantsByBqRepository => {
  class LoadParticipantsByBqRepositoryStub implements LoadParticipantsByBqRepository {
    async load (barbecueId: string): Promise<ParticipantModel[]> {
      return Promise.resolve([mockParticipantModel()])
    }
  }
  return new LoadParticipantsByBqRepositoryStub()
}