import { SaveBarbecueRepository } from '../protocols/db/barbecue/save-barbecue-repository'
import { BarbecueModel } from '@/domain/models/barbecue'
import { mockBarbecueModel } from '@/domain/test'
import { barbecueParams } from '@/domain/usecases/barbecue/save-barbecue'

export const mockSaveBarbecueRepository = (): SaveBarbecueRepository => {
  class SaveBarbecueRepositoryStub implements SaveBarbecueRepository {
    async save (barbecue: barbecueParams): Promise<BarbecueModel> {
      return Promise.resolve(mockBarbecueModel())
    }
  }
  return new SaveBarbecueRepositoryStub()
}
