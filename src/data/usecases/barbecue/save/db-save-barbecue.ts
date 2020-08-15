import { SaveBarbecue, barbecueParams } from '@/domain/usecases'
import { BarbecueModel } from '@/domain/models'
import { SaveBarbecueRepository } from '@/data/protocols/db'

export class DbSaveBarbecue implements SaveBarbecue {
  constructor (private readonly saveBarbecueRepository: SaveBarbecueRepository) {}

  async save (barbecue: barbecueParams): Promise<BarbecueModel> {
    const barbecueSave = await this.saveBarbecueRepository.save(barbecue)
    return barbecueSave
  }
}
