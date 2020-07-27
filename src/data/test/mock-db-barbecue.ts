import { SaveBarbecueRepository } from '@/data/protocols/db/barbecue/save-barbecue-repository'
import { LoadBarbecuesRepository } from '@/data/protocols/db/barbecue/load-barbecue-repository'
import { LoadBarbecueByIdRepository } from '@/data/protocols/db/barbecue/load-barbecue-by-id-repository'
import { BarbecueModel } from '@/domain/models/barbecue'
import { mockBarbecueModel, mockBarbecueList } from '@/domain/test'
import { barbecueParams } from '@/domain/usecases/barbecue/save-barbecue'

export const mockSaveBarbecueRepository = (): SaveBarbecueRepository => {
  class SaveBarbecueRepositoryStub implements SaveBarbecueRepository {
    async save (barbecue: barbecueParams): Promise<BarbecueModel> {
      return Promise.resolve(mockBarbecueModel())
    }
  }
  return new SaveBarbecueRepositoryStub()
}

export const mockLoadBarbecuesRepository = (): LoadBarbecuesRepository => {
  class LoadBarbecuesRepositoryStub implements LoadBarbecuesRepository {
    async loadAll (accountId: string): Promise<BarbecueModel[]> {
      return Promise.resolve(mockBarbecueList())
    }
  }
  return new LoadBarbecuesRepositoryStub()
}

export const mockLoadBarbecueByIdRepository = (): LoadBarbecueByIdRepository => {
  class LoadBarbecueByIdRepositoryStub implements LoadBarbecueByIdRepository {
    async loadById (accountId: string): Promise<BarbecueModel> {
      return Promise.resolve(mockBarbecueModel())
    }
  }
  return new LoadBarbecueByIdRepositoryStub()
}
