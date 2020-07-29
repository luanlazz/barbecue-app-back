import { SaveParticipantRepository } from '@/data/protocols/db/barbecue-participant/db-save-participant'
import { LoadParticipantsByBqRepository } from '@/data/protocols/db/barbecue-participant/db-load-participants-by-bq'
import { SaveParticipantParams } from '@/domain/usecases/barbecue-participant/save-participant'
import { ParticipantModel } from '@/domain/models/participant'
import { mockParticipantsModel } from '@/domain/test/mock-participant'
import { RemoveParticipantRepository } from '../protocols/db/barbecue-participant/db-remove-participant'

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
      return Promise.resolve(mockParticipantsModel())
    }
  }
  return new LoadParticipantsByBqRepositoryStub()
}

export const mockRemoveParticipantRepository = (): RemoveParticipantRepository => {
  class RemoveParticipantRepositoryStub implements RemoveParticipantRepository {
    async remove (barbecueId: string, participantId: string): Promise<ParticipantModel[]> {
      return Promise.resolve(mockParticipantsModel())
    }
  }
  return new RemoveParticipantRepositoryStub()
}
