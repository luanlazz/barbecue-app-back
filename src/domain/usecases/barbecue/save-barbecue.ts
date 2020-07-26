import { BarbecueModel } from '@/domain/models/barbecue'

export type barbecueParams = Omit<BarbecueModel, 'id'>

export interface SaveBarbecue {
  save(barbecue: barbecueParams): Promise<BarbecueModel>
}
