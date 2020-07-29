import { BarbecueModel } from '@/domain/models/barbecue'

export type barbecueParams = {
  barbecueId: string
  accountId: string
  date: Date
  description: string
  observation: string
  numParticipants: number
  valueTotalDrink: number
  valueTotalFood: number
  valueCollected: number
}

export interface SaveBarbecue {
  save(barbecue: barbecueParams): Promise<BarbecueModel>
}
