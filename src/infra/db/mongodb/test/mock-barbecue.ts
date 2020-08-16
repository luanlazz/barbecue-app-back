import { Collection, ObjectID } from 'mongodb'
import faker from 'faker'

export const mockBarbecueParams = (accountId: string): any => ({
  barbecueId: new ObjectID(),
  accountId: new ObjectID(accountId),
  date: faker.date.recent().toISOString(),
  description: faker.random.words(),
  observation: faker.random.words(),
  valueSuggestDrink: faker.random.number(),
  valueSuggestFood: faker.random.number()
})

export const makeBarbecue = async (collection: Collection, accountId?: string): Promise<string> => {
  const res = await collection.insertOne(mockBarbecueParams(accountId))
  return res.ops[0]._id
}

export const makeBarbecues = async (collection: Collection, barbecueId: string): Promise<void> => {
  const participants = [
    { ...mockBarbecueParams(barbecueId) },
    { ...mockBarbecueParams(barbecueId) }
  ]
  await collection.insertMany(participants)
}
