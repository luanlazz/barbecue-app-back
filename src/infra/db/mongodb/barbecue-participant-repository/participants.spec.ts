import { ParticipantsMongoRepository } from './participants'
import { mockParticipantParams } from '@/domain/test'
import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'
import { Collection } from 'mongodb'

let participantsCollection: Collection
let barbecueCollection: Collection

const makeBarbecue = async (valueTotalDrink: number = 0, valueTotalFood: number = 0): Promise<string> => {
  const barbecue = {
    accountId: '5f1b89c1480b9674bd2d724c',
    date: '25/08/2020',
    description: 'Primeiro churras!',
    observation: 'teste',
    valueTotalDrink,
    valueTotalFood
  }

  const res = await barbecueCollection.insertOne(barbecue)
  return res.ops[0]._id
}

const makeParticipants = async (barbecueId: string): Promise<void> => {
  await participantsCollection.insertMany([{
    barbecueId,
    participantId: 'participant_one',
    name: 'one_name',
    food: true,
    drink: false,
    pay: false
  }, {
    barbecueId,
    participantId: 'participant_two',
    name: 'two_name',
    food: false,
    drink: true,
    pay: false
  }, {
    barbecueId,
    participantId: 'participant_two',
    name: 'three_name',
    food: true,
    drink: true,
    pay: false
  }, {
    barbecueId,
    participantId: 'participant_two',
    name: 'four_name',
    food: true,
    drink: true,
    pay: false
  }])
}

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
    barbecueCollection = await MongoHelper.getCollection('barbecues')
    await barbecueCollection.deleteMany({})
  })

  const makeSut = (): ParticipantsMongoRepository => {
    return new ParticipantsMongoRepository()
  }

  describe('save', () => {
    test('Should save a participant if its new', async () => {
      const sut = makeSut()
      const barbecueId = await makeBarbecue()
      const participantParams = mockParticipantParams()
      participantParams.barbecueId = barbecueId
      participantParams.participantId = null
      await sut.save(participantParams)
      const participant = participantsCollection.findOne({
        barbecueId: participantParams.barbecueId
      })
      expect(participant).toBeTruthy()
    })

    test('Should update a participant if its not new', async () => {
      const sut = makeSut()
      const barbecueId = await makeBarbecue()
      const participantParams = mockParticipantParams()
      participantParams.barbecueId = barbecueId
      const res = await participantsCollection.insertOne(participantParams)
      const id = res.ops[0]._id
      participantParams.participantId = id
      participantParams.name = 'other_name'
      await sut.save(participantParams)
      const participant = await participantsCollection.findOne({
        _id: id,
        barbecueId: participantParams.barbecueId
      })
      expect(participant).toBeTruthy()
      expect(participant.name).toBe('other_name')
    })
  })

  describe('load', () => {
    test('Should load return list of participants', async () => {
      const barbecueId = await makeBarbecue(90, 150)
      await makeParticipants(barbecueId)
      const sut = makeSut()
      const participants = await sut.load(barbecueId)
      expect(participants[0]).toBeTruthy()
      expect(participants[0].id).toBeTruthy()
      expect(participants[1]).toBeTruthy()
      expect(participants[1].id).toBeTruthy()
      expect(participants[2]).toBeTruthy()
      expect(participants[2].id).toBeTruthy()
      expect(participants[3]).toBeTruthy()
      expect(participants[3].id).toBeTruthy()
    })

    test('Should return a empty list if no find any participant', async () => {
      const sut = makeSut()
      const barbecueId = await makeBarbecue()
      const participants = await sut.load(barbecueId)
      expect(participants.length).toBe(0)
    })
  })

  describe('remove', () => {
    test('Should remove participant by barbecue id and id', async () => {
      const barbecueId = await makeBarbecue(90, 150)
      const res = await participantsCollection.insertOne({
        barbecueId,
        name: 'any_name',
        food: false,
        drink: true,
        pay: false
      })
      const id = res.ops[0]._id
      const sut = makeSut()
      const result = await sut.remove(barbecueId, id)
      expect(result).toBe(1)
    })
  })
})
