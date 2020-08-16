import { ParticipantsMongoRepository } from './participants'
import { mockParticipantParams } from '@/domain/test'
import { makeBarbecue, makeParticipant, makeParticipants } from '@/infra/db/mongodb/test'
import { MongoHelper } from '@/infra/db/mongodb'
import { Collection, ObjectID } from 'mongodb'

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
      const barbecueId = await makeBarbecue(barbecueCollection)
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
      const barbecueId = await makeBarbecue(barbecueCollection)
      const participantId = await makeParticipant(participantsCollection, barbecueId)

      const participantNew = mockParticipantParams()
      participantNew.barbecueId = barbecueId
      participantNew.participantId = participantId
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
      const barbecueId = await makeBarbecue(barbecueCollection)
      const participantId = await makeParticipant(participantsCollection, barbecueId)
      const sut = makeSut()
      const participant = await sut.loadById(participantId)
      expect(participant).toBeTruthy()
      expect(participant.id).toBeTruthy()
      expect(participant.name).toBeTruthy()
      expect(participant.value).toBeTruthy()
    })

    test('Should return null if not find participant', async () => {
      const sut = makeSut()
      const participant = await sut.loadById(new ObjectID().toHexString())
      expect(participant).toBeNull()
    })
  })

  describe('load', () => {
    test('Should load return list of participants', async () => {
      const barbecueId = await makeBarbecue(barbecueCollection)
      await makeParticipants(participantsCollection, barbecueId)
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
      const barbecueId = await makeBarbecue(barbecueCollection)
      const participants = await sut.load(barbecueId)
      expect(participants.length).toBe(0)
    })
  })

  describe('remove', () => {
    test('Should remove participant by barbecue id and id', async () => {
      const barbecueId = await makeBarbecue(barbecueCollection)
      const participantId = await makeParticipant(participantsCollection, barbecueId)
      const sut = makeSut()
      const result = await sut.remove(barbecueId, participantId)
      expect(result).toBeTruthy()
      const count = await participantsCollection.count()
      expect(count).toBe(0)
    })

    test('Should return false if not remove a participant', async () => {
      const barbecueId = await makeBarbecue(barbecueCollection)
      await makeParticipant(participantsCollection, barbecueId)
      const sut = makeSut()
      const result = await sut.remove(barbecueId, new ObjectID().toHexString())
      expect(result).toBeFalsy()
      const count = await participantsCollection.count()
      expect(count).toBe(1)
    })
  })
})
