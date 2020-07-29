import { ParticipantsMongoRepository } from './participants'
import { mockParticipantParams } from '@/domain/test'
import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'
import { SaveParticipantParams } from '@/domain/usecases/barbecue-participant/save-participant'
import { barbecueParams } from '@/domain/usecases/barbecue/save-barbecue'
import { Collection, ObjectID } from 'mongodb'

let participantsCollection: Collection
let barbecueCollection: Collection

const makeBarbecue = async (accountId: string = new ObjectID().toHexString()): Promise<string> => {
  const barbecue: barbecueParams = {
    barbecueId: new ObjectID().toHexString(),
    accountId,
    date: new Date('25/08/2020'),
    description: 'Primeiro churras!',
    observation: 'teste',
    numParticipants: 0,
    valueSuggestDrink: 0,
    valueSuggestFood: 0,
    valueTotal: 0,
    valueCollected: 0
  }

  const res = await barbecueCollection.insertOne(barbecue)
  return res.ops[0]._id
}

const makeParticipants = async (barbecueId: string): Promise<void> => {
  const participants: SaveParticipantParams[] = [{
    barbecueId,
    participantId: 'participant_one',
    name: 'one_name',
    pay: false,
    value: 20
  }, {
    barbecueId,
    participantId: 'participant_two',
    name: 'two_name',
    pay: false,
    value: 10
  }, {
    barbecueId,
    participantId: 'participant_two',
    name: 'three_name',
    pay: false,
    value: 20
  }, {
    barbecueId,
    participantId: 'participant_two',
    name: 'four_name',
    pay: false,
    value: 10
  }]
  await participantsCollection.insertMany(participants)
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
      const result = await sut.save(participantParams)
      expect(result.oldParticipant).toBeNull()
      expect(result.status).toBeTruthy()
    })

    test('Should update a participant if its already exists', async () => {
      const sut = makeSut()
      const barbecueId = await makeBarbecue()
      const participantOld = mockParticipantParams()
      participantOld.barbecueId = barbecueId
      const res = await participantsCollection.insertOne(participantOld)
      const id = res.ops[0]._id

      const participantNew = mockParticipantParams()
      participantNew.barbecueId = barbecueId
      participantNew.participantId = id
      participantNew.name = 'other_name'

      const result = await sut.save(participantNew)
      expect(new ObjectID(result.oldParticipant.id)).toStrictEqual(new ObjectID(id))
      expect(new ObjectID(result.oldParticipant.barbecueId)).toStrictEqual(new ObjectID(barbecueId))
      expect(result.oldParticipant.name).toBe('any_name')
      expect(result.status).toBeTruthy()
      const count = await participantsCollection.count()
      expect(count).toBe(1)
    })
  })

  describe('load', () => {
    test('Should load return list of participants', async () => {
      const barbecueId = await makeBarbecue()
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
      const barbecueId = await makeBarbecue()
      const res = await participantsCollection.insertOne({
        barbecueId,
        name: 'any_name',
        pay: false,
        value: 10
      })
      const id = res.ops[0]._id
      const sut = makeSut()
      const result = await sut.remove(barbecueId, id)
      expect(result).toBe(1)
      const count = await participantsCollection.count()
      expect(count).toBe(0)
    })

    test('Should return 0 if not remove a participant', async () => {
      const barbecueId = await makeBarbecue()
      await participantsCollection.insertOne({
        barbecueId,
        name: 'any_name',
        food: false,
        drink: true,
        pay: false
      })
      const sut = makeSut()
      const result = await sut.remove(barbecueId, new ObjectID().toHexString())
      expect(result).toBe(0)
      const count = await participantsCollection.count()
      expect(count).toBe(1)
    })
  })
})
