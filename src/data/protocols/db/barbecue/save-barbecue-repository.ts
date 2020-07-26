import { barbecueParams } from '@/domain/usecases/barbecue/save-barbecue'
import { BarbecueModel } from '@/domain/models/barbecue'

export interface SaveBarbecueRepository {
  save (barbecue: barbecueParams): Promise<BarbecueModel>
}
