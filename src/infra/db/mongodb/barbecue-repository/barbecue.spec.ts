import env from '@/main/config/env'
import { BarbecueMongoRepository } from './barbecue'
import { mockBarbecueParams, mockAddAccountParams } from '@/domain/test'
import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'
import { Collection, ObjectID } from 'mongodb'
import { sign } from 'jsonwebtoken'

let barbecueCollection: Collection
let accountCollection: Collection

const makeBarbecue = async (valueTotalDrink: number = 0, valueTotalFood: number = 0): Promise<string> => {
  const barbecue = {
    accountId: new ObjectID('5f1b89c1480b9674bd2d724c'),
    date: '25/08/2020',
    description: 'Primeiro churras!',
    observation: 'teste',
    valueTotalDrink,
    valueTotalFood
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
  })

  describe('loadAll', () => {
    test('Should return a list of barbecues on success', async () => {
      const sut = makeSut()
      const barbecueId = await makeBarbecue()
      const { accountId } = await makeAccessToken()
      await barbecueCollection.insertMany([{
        barbecueId,
        accountId,
        date: new Date('2020-01-08'),
        description: 'any_description',
        observation: 'any_observation',
        valueTotalDrink: 0,
        valueTotalFood: 0
      }, {
        barbecueId,
        accountId,
        date: new Date('2020-02-08'),
        description: 'other_description',
        observation: 'other_observation',
        valueTotalDrink: 0,
        valueTotalFood: 0
      }])
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
