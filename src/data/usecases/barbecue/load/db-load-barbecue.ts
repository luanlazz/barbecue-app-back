import { BarbecueModel } from '@/domain/models'
import { LoadBarbecues } from '@/domain/usecases'
import { LoadBarbecuesRepository } from '@/data/protocols/db'

export class DbLoadBarbecues implements LoadBarbecues {
  constructor (private readonly loadBarbecuesRepository: LoadBarbecuesRepository) {}

  async load (accountId: string): Promise<BarbecueModel[]> {
    const barbecues = await this.loadBarbecuesRepository.loadAll(accountId)
    return barbecues
  }
}
