import { BarbecueModel } from '@/domain/models/barbecue'

export interface LoadBarbecuesRepository {
  loadAll (accountId: string): Promise<BarbecueModel[]>
}
