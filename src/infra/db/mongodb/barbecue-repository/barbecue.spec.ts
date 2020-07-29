import env from '@/main/config/env'
import { BarbecueMongoRepository } from './barbecue'
import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'
import { mockBarbecueParams, mockAddAccountParams } from '@/domain/test'
import { barbecueParams } from '@/domain/usecases/barbecue/save-barbecue'
import { Collection, ObjectID } from 'mongodb'
import { sign } from 'jsonwebtoken'

let barbecueCollection: Collection
let accountCollection: Collection

const makeBarbecue = async (accountId: string = new ObjectID().toHexString(), valueTotalDrink: number = 0, valueTotalFood: number = 0): Promise<string> => {
  const barbecue: barbecueParams = {
    barbecueId: new ObjectID().toHexString(),
    accountId,
    date: new Date('25/08/2020'),
    description: 'Primeiro churras!',
    observation: 'teste',
    numParticipants: 0,
    valueTotalDrink,
    valueTotalFood,
    valueCollected: 0
  }

  const res = await barbecueCollection.insertOne(barbecue)
  return res.ops[0]._id
}

type mockAccount = {
  accessToken: string
  accountId: string
}

const makeAccessToken = async (): Promise<mockAccount> => {
  const res = await accountCollection.insertOne(mockAddAccountParams())
  const id = res.ops[0]._id
  const accessToken = sign({ id }, env.jwtSecret)
  await accountCollection.updateOne({
    _id: id
  }, {
    $set: {
      accessToken
    }
  })
  return {
    accessToken,
    accountId: id
  }
}

describe('Barbecue Mongo Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    barbecueCollection = await MongoHelper.getCollection('barbecues')
    await barbecueCollection.deleteMany({})
    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  const makeSut = (): BarbecueMongoRepository => {
    return new BarbecueMongoRepository()
  }

  describe('save', () => {
    test('Should return an barbecue on success', async () => {
      const sut = makeSut()
      const { accountId } = await makeAccessToken()
      const barbecueParams = mockBarbecueParams()
      barbecueParams.accountId = accountId
      barbecueParams.barbecueId = null
      const barbecueResult = await sut.save(barbecueParams)
      expect(barbecueResult).toBeTruthy()
      expect(barbecueResult.id).toBeTruthy()
      expect(barbecueResult.date).toEqual(barbecueParams.date)
      expect(barbecueResult.description).toEqual(barbecueParams.description)
      expect(barbecueResult.observation).toEqual(barbecueParams.observation)
      expect(barbecueResult.valueTotalDrink).toEqual(barbecueParams.valueTotalDrink)
      expect(barbecueResult.valueTotalFood).toEqual(barbecueParams.valueTotalFood)
    })

    test('Should update if barbecue exists', async () => {
      const sut = makeSut()
      const { accountId } = await makeAccessToken()
      const barbecueId = await makeBarbecue(accountId)
      const newBarbecue = mockBarbecueParams()
      newBarbecue.barbecueId = barbecueId
      newBarbecue.accountId = accountId
      const barbecueResult = await sut.save(newBarbecue)
      expect(barbecueResult).toBeTruthy()
      expect(barbecueResult.id).toBeTruthy()
      expect(barbecueResult.date).toEqual(newBarbecue.date)
      expect(barbecueResult.description).toEqual(newBarbecue.description)
      expect(barbecueResult.observation).toEqual(newBarbecue.observation)
      expect(barbecueResult.numParticipants).toEqual(newBarbecue.numParticipants)
      expect(barbecueResult.valueTotalDrink).toEqual(newBarbecue.valueTotalDrink)
      expect(barbecueResult.valueTotalFood).toEqual(newBarbecue.valueTotalFood)
      expect(barbecueResult.valueCollected).toEqual(newBarbecue.valueCollected)
    })
  })

  describe('loadAll', () => {
    test('Should return a list of barbecues on success', async () => {
      const sut = makeSut()
      const { accountId } = await makeAccessToken()
      const barbecueId = await makeBarbecue()
      const barbecues: barbecueParams[] = [{
        barbecueId,
        accountId,
        date: new Date('2020-01-08'),
        description: 'any_description',
        observation: 'any_observation',
        numParticipants: 0,
        valueTotalDrink: 0,
        valueTotalFood: 0,
        valueCollected: 0
      }, {
        barbecueId,
        accountId,
        date: new Date('2020-02-08'),
        description: 'other_description',
        observation: 'other_observation',
        numParticipants: 0,
        valueTotalDrink: 0,
        valueTotalFood: 0,
        valueCollected: 0
      }]
      await barbecueCollection.insertMany(barbecues)
      const barbecueResult = await sut.loadAll(accountId)
      expect(barbecueResult.length).toBe(2)
      expect(barbecueResult[0]).toBeTruthy()
      expect(barbecueResult[1]).toBeTruthy()
      expect(barbecueResult[0].id).toBeTruthy()
      expect(barbecueResult[1].id).toBeTruthy()
    })

    test('Should return a empty list if no find any barbecue', async () => {
      const sut = makeSut()
      const { accountId } = await makeAccessToken()
      const barbecueResult = await sut.loadAll(accountId)
      expect(barbecueResult.length).toBe(0)
    })
  })

  describe('loadById', () => {
    test('Should return a barbecue on success', async () => {
      const sut = makeSut()
      const barbecueId = await makeBarbecue()
      const barbecueResult = await sut.loadById(barbecueId)
      expect(barbecueResult).toBeTruthy()
      expect(barbecueResult.id).toBeTruthy()
    })

    test('Should return null if no exists any barbecue', async () => {
      const sut = makeSut()
      const barbecueResult = await sut.loadById(new ObjectID().toHexString())
      expect(barbecueResult).toBeFalsy()
      expect(barbecueResult).toBeNull()
    })
  })
})
