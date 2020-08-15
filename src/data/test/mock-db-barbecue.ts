import { SaveBarbecueRepository, LoadBarbecuesRepository, LoadBarbecueByIdRepository } from '@/data/protocols/db'
import { BarbecueModel } from '@/domain/models'
import { barbecueParams } from '@/domain/usecases'
import { mockBarbecueModel, mockBarbecuesList } from '@/domain/test'

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
      return Promise.resolve(mockBarbecuesList())
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
