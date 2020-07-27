import { BarbecueModel } from '@/domain/models/barbecue'

export interface LoadBarbecueById {
  loadById (barbecueId: string): Promise<BarbecueModel>
}
