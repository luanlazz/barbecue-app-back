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

const makeParticipant = async (barbecueId: string): Promise<string> => {
  const participant: SaveParticipantParams = {
    barbecueId,
    participantId: 'any_participant_id',
    name: 'any_name',
    pay: false,
    value: 20
  }

  const res = await participantsCollection.insertOne(participant)
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
      expect(result.id).toBeTruthy()
      expect(result.name).toEqual(participantParams.name)
      expect(result.pay).toEqual(participantParams.pay)
      expect(result.value).toEqual(participantParams.value)
    })

    test('Should update a participant if its already exists', async () => {
      const sut = makeSut()
      const barbecueId = await makeBarbecue()
      const participant = mockParticipantParams()
      participant.barbecueId = barbecueId
      const res = await participantsCollection.insertOne(participant)
      const id = res.ops[0]._id

      const participantNew = mockParticipantParams()
      participantNew.barbecueId = barbecueId
      participantNew.participantId = id
      participantNew.name = 'other_name'

      const result = await sut.save(participantNew)
      expect(result.id).toBeTruthy()
      expect(result.name).toEqual(participantNew.name)
      const count = await participantsCollection.count()
      expect(count).toBe(1)
    })
  })

  describe('loadById', () => {
    test('Should load by id return a participant', async () => {
      const barbecueId = await makeBarbecue()
      const participantId = await makeParticipant(barbecueId)
      const sut = makeSut()
      const participant = await sut.loadById(participantId)
      expect(participant).toBeTruthy()
      expect(participant.id).toBeTruthy()
      expect(participant.name).toBe('any_name')
    })

    test('Should return null if not find participant', async () => {
      const sut = makeSut()
      const participant = await sut.loadById(new ObjectID().toHexString())
      expect(participant).toBeNull()
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
      expect(result).toBeTruthy()
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
      expect(result).toBeFalsy()
      const count = await participantsCollection.count()
      expect(count).toBe(1)
    })
  })
})
