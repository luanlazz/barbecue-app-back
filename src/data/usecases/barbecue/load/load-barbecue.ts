import { BarbecueModel } from '@/domain/models/barbecue'
import { LoadBarbecues } from '@/domain/usecases/barbecue/load-barbecues'
import { LoadBarbecuesRepository } from '@/data/protocols/db/barbecue/load-barbecues-repository'

export class DbLoadBarbecues implements LoadBarbecues {
  constructor (private readonly loadBarbecuesRepository: LoadBarbecuesRepository) {}

  async load (accountId: string): Promise<BarbecueModel[]> {
    const barbecues = await this.loadBarbecuesRepository.loadAll(accountId)
    return barbecues
  }
}
