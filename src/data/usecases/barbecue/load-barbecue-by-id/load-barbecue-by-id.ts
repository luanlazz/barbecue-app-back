import { LoadBarbecueByIdRepository } from '@/data/protocols/db/barbecue/load-barbecue-by-id-repository'
import { BarbecueModel } from '@/domain/models/barbecue'
import { LoadBarbecueById } from '@/domain/usecases/barbecue/load-barbecue-by-id'

export class DbLoadBarbecueById implements LoadBarbecueById {
  constructor (private readonly loadBarbecueByIdRepository: LoadBarbecueByIdRepository) {}

  async loadById (barbecueId: string): Promise<BarbecueModel> {
    await this.loadBarbecueByIdRepository.loadById(barbecueId)
    return Promise.resolve(null)
  }
}
