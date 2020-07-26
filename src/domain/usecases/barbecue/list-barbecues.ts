import { BarbecueModel } from '@/domain/models/barbecue'

export interface LoadBarbecues {
  load (accountId: string): Promise<BarbecueModel[]>
}
