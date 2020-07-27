import { SaveBarbecue, barbecueParams } from '@/domain/usecases/barbecue/save-barbecue'
import { LoadBarbecues } from '@/domain/usecases/barbecue/load-barbecues'
import { LoadBarbecueById } from '@/domain/usecases/barbecue/load-barbecue-by-id'
import { BarbecueModel } from '@/domain/models/barbecue'
import { mockBarbecueModel, mockBarbecueList } from '@/domain/test'

export const mockSaveBarbecue = (): SaveBarbecue => {
  class SaveBarbecueStub implements SaveBarbecue {
    async save (barbecue: barbecueParams): Promise<BarbecueModel> {
      return await Promise.resolve(mockBarbecueModel())
    }
  }
  return new SaveBarbecueStub()
}

export const mockLoadBarbecues = (): LoadBarbecues => {
  class LoadBarbecuesStub implements LoadBarbecues {
    async load (accountId: string): Promise<BarbecueModel[]> {
      return await Promise.resolve(mockBarbecueList())
    }
  }
  return new LoadBarbecuesStub()
}

export const mockLoadBarbecueById = (): LoadBarbecueById => {
  class LoadBarbecueByIdStub implements LoadBarbecueById {
    async loadById (barbecueId: string): Promise<BarbecueModel> {
      return await Promise.resolve(mockBarbecueModel())
    }
  }
  return new LoadBarbecueByIdStub()
}
