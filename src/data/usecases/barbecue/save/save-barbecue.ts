import { SaveBarbecue, barbecueParams } from '@/domain/usecases/barbecue/save-barbecue'
import { BarbecueModel } from '@/domain/models/barbecue'
import { SaveBarbecueRepository } from '@/data/protocols/db/barbecue/save-barbecue-repository'

export class DbSaveBarbecue implements SaveBarbecue {
  constructor (private readonly saveBarbecueRepository: SaveBarbecueRepository) {}

  async save (barbecue: barbecueParams): Promise<BarbecueModel> {
    const barbecueSave = await this.saveBarbecueRepository.save(barbecue)
    return barbecueSave
  }
}
