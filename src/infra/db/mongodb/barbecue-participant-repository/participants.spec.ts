import { ParticipantsMongoRepository } from './participants'
import { mockParticipantParams } from '@/domain/test'
import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'
import { Collection } from 'mongodb'

let participantsCollection: Collection

describe('Participants Mongo Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    participantsCollection = await MongoHelper.getCollection('participants')
    await participantsCollection.deleteMany({})
  })

  const makeSut = (): ParticipantsMongoRepository => {
    return new ParticipantsMongoRepository()
  }

  describe('save', () => {
    test('Should save a participant if its new', async () => {
      const sut = makeSut()
      const participantParams = mockParticipantParams()
      await sut.save(participantParams)
      const participant = participantsCollection.findOne({
        barbecueId: participantParams.barbecueId
      })
      expect(participant).toBeTruthy()
    })

    test('Should update a participant if its not new', async () => {
      const sut = makeSut()
      const participantParams = mockParticipantParams()
      const res = await participantsCollection.insertOne(participantParams)
      const id = res.ops[0]._id
      participantParams.participantId = id
      participantParams.name = 'other_name'
      await sut.save(participantParams)
      const participant = await participantsCollection.findOne({
        _id: id,
        barbecueId: participantParams.barbecueId
      })
      console.log('participant', participant)
      expect(participant).toBeTruthy()
      expect(participant.name).toBe('other_name')
    })
  })
})
