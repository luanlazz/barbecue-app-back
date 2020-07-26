import { BarbecueModel } from '../models/barbecue'
import { barbecueParams } from '../usecases/barbecue/save-barbecue'

export const mockBarbecueParams = (): barbecueParams => ({
  id: 'any_id',
  accountId: 'any_account_id',
  date: new Date('2020-01-08'),
  description: 'any_description',
  observation: 'any_observation',
  valueTotalDrink: 0,
  valueTotalFood: 0
})

export const mockBarbecueModel = (): BarbecueModel => ({
  id: 'any_id',
  date: new Date('2020-01-08'),
  description: 'any_description',
  observation: 'any_observation',
  valueTotalDrink: 0,
  valueTotalFood: 0
})
