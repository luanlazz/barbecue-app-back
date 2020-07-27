import { ParticipantsMongoRepository } from './participants'
import { mockParticipantParams } from '@/domain/test'
import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'
import { Collection } from 'mongodb'

let participantsCollection: Collection
let barbecueCollection: Collection

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
      expect(participant).toBeTruthy()
      expect(participant.name).toBe('other_name')
    })
  })

  describe('load', () => {
    test('Should load return list of participants', async () => {
      const barbecue = {
        accountId: '5f1b89c1480b9674bd2d724c',
        date: '25/08/2020',
        description: 'Primeiro churras!',
        observation: 'teste',
        valueTotalDrink: 90,
        valueTotalFood: 150
      }

      const res = await barbecueCollection.insertOne(barbecue)
      const barbecueId = res.ops[0]._id

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

      const sut = makeSut()
      const participants = await sut.load(barbecueId)
      expect(participants[0]).toBeTruthy()
      expect(participants[0].value).toBe(50)
      expect(participants[1]).toBeTruthy()
      expect(participants[1].value).toBe(30)
      expect(participants[2]).toBeTruthy()
      expect(participants[2].value).toBe(80)
      expect(participants[3]).toBeTruthy()
      expect(participants[3].value).toBe(80)
    })
  })
})
