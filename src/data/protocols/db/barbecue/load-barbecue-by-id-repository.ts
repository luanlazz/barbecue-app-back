import { BarbecueModel } from '@/domain/models/barbecue'

export interface LoadBarbecueByIdRepository {
  loadById (barbecueId: string): Promise<BarbecueModel>
}
