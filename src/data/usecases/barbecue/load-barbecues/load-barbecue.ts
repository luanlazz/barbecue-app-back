import { BarbecueModel } from '@/domain/models/barbecue'
import { LoadBarbecues } from '@/domain/usecases/barbecue/list-barbecues'
import { LoadBarbecuesRepository } from '@/data/protocols/db/barbecue/load-barbecue-repository'

export class DbLoadBarbecue implements LoadBarbecues {
  constructor (private readonly loadBarbecuesRepository: LoadBarbecuesRepository) {}

  async load (accountId: string): Promise<BarbecueModel[]> {
    await this.loadBarbecuesRepository.loadAll(accountId)
    return Promise.resolve(null)
  }
}
