import { BarbecueModel } from '../models/barbecue'
import { barbecueParams } from '../usecases/barbecue/save-barbecue'

export const mockBarbecueParams = (): barbecueParams => ({
  barbecueId: 'any_barbecue_id',
  accountId: 'any_account_id',
  date: new Date('2020-01-08'),
  description: 'any_description',
  observation: 'any_observation',
  numParticipants: 0,
  valueSuggestDrink: 0,
  valueSuggestFood: 0,
  valueTotal: 0,
  valueCollected: 0
})

export const mockBarbecueModel = (): BarbecueModel => ({
  id: 'any_id',
  date: new Date('2020-01-08'),
  description: 'any_description',
  observation: 'any_observation',
  numParticipants: 0,
  valueSuggestDrink: 0,
  valueSuggestFood: 0,
  valueTotal: 0,
  valueCollected: 0
})

export const mockBarbecuesList = (): BarbecueModel[] => ([
  {
    id: 'any_id',
    date: new Date('2020-01-08'),
    description: 'any_description',
    observation: 'any_observation',
    numParticipants: 0,
    valueSuggestDrink: 0,
    valueSuggestFood: 0,
    valueTotal: 0,
    valueCollected: 0
  },
  {
    id: 'other_id',
    date: new Date('2020-05-08'),
    description: 'other_description',
    observation: 'other_observation',
    numParticipants: 0,
    valueSuggestDrink: 0,
    valueSuggestFood: 0,
    valueTotal: 0,
    valueCollected: 0
  }
])
