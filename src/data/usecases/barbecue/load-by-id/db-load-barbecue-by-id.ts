import { LoadBarbecueByIdRepository } from '@/data/protocols/db'
import { BarbecueModel } from '@/domain/models'
import { LoadBarbecueById } from '@/domain/usecases'

export class DbLoadBarbecueById implements LoadBarbecueById {
  constructor (private readonly loadBarbecueByIdRepository: LoadBarbecueByIdRepository) {}

  async loadById (barbecueId: string): Promise<BarbecueModel> {
    const barbecue = await this.loadBarbecueByIdRepository.loadById(barbecueId)
    return barbecue
  }
}
