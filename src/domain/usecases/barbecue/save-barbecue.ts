import { BarbecueModel } from '@/domain/models/barbecue'

export type barbecueParams = {
  barbecueId: string
  accountId: string
  date: Date
  description: string
  observation: string
  valueSuggestDrink: number
  valueSuggestFood: number
}

export interface SaveBarbecue {
  save(barbecue: barbecueParams): Promise<BarbecueModel>
}
