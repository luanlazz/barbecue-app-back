import { SaveBarbecue, barbecueParams } from '@/domain/usecases/barbecue/save-barbecue'
import { BarbecueModel } from '@/domain/models/barbecue'
import { mockBarbecueModel } from '@/domain/test'
import { LoadBarbecues } from '@/domain/usecases/barbecue/list-barbecues'

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
      return await Promise.resolve([mockBarbecueModel()])
    }
  }
  return new LoadBarbecuesStub()
}
