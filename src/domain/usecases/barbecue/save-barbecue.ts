import { BarbecueModel } from '@/domain/models/barbecue'

export type barbecueParams = {
  id?: string
  date: Date
  description: string
  observation: string
  valueTotalDrink: number
  valueTotalFood: number
}

export interface SaveBarbecue {
  save(barbecue: barbecueParams): Promise<BarbecueModel>
}
