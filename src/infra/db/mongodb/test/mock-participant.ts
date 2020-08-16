import { Collection, ObjectID } from 'mongodb'
import faker from 'faker'

const mockParticipantParams = (barbecueId: string): any => ({
  barbecueId: new ObjectID(barbecueId),
  participantId: new ObjectID(),
  name: faker.name.findName(),
  pay: faker.random.boolean(),
  value: faker.random.number()
})

export const makeParticipant = async (collection: Collection, barbecueId: string): Promise<string> => {
  const res = await collection.insertOne(mockParticipantParams(barbecueId))
  return res.ops[0]._id
}

export const makeParticipants = async (collection: Collection, barbecueId: string): Promise<void> => {
  const participants = [
    { ...mockParticipantParams(barbecueId) },
    { ...mockParticipantParams(barbecueId) },
    { ...mockParticipantParams(barbecueId) },
    { ...mockParticipantParams(barbecueId) }
  ]
  await collection.insertMany(participants)
}
