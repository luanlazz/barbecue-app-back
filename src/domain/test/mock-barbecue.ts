import { BarbecueModel } from '../models/barbecue'

export const mockBarbecueModel = (): BarbecueModel => ({
  id: 'any_id',
  date: new Date('2020-01-08'),
  description: 'any_description',
  observation: 'any_observation',
  valueTotalDrink: 0,
  valueTotalFood: 0
})
