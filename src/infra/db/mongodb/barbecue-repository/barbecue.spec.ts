import env from '@/main/config/env'
import { BarbecueMongoRepository } from './barbecue'
import { MongoHelper } from '@/infra/db/mongodb'
import { mockBarbecueParams, mockAddAccountParams } from '@/domain/test'
import { barbecueParams } from '@/domain/usecases'
import { Collection, ObjectID } from 'mongodb'
import { sign } from 'jsonwebtoken'

let barbecueCollection: Collection
let accountCollection: Collection

const makeBarbecue = async (accountId: string = new ObjectID().toHexString()): Promise<string> => {
  const barbecue: barbecueParams = {
    barbecueId: new ObjectID().toHexString(),
    accountId,
    date: new Date().toISOString(),
    description: 'Primeiro churras!',
    observation: 'teste',
    valueSuggestDrink: 0,
    valueSuggestFood: 0
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
      barbecueParams.date = new Date().toISOString()
      const barbecueResult = await sut.save(barbecueParams)
      expect(barbecueResult).toBeTruthy()
      expect(barbecueResult.id).toBeTruthy()
      expect(barbecueResult.date).toEqual(new Date(barbecueParams.date))
      expect(barbecueResult.description).toEqual(barbecueParams.description)
      expect(barbecueResult.observation).toEqual(barbecueParams.observation)
      expect(barbecueResult.valueSuggestDrink).toEqual(barbecueParams.valueSuggestDrink)
      expect(barbecueResult.valueSuggestFood).toEqual(barbecueParams.valueSuggestFood)
    })

    test('Should update if barbecue exists', async () => {
      const sut = makeSut()
      const { accountId } = await makeAccessToken()
      const barbecueId = await makeBarbecue(accountId)
      const newBarbecue = mockBarbecueParams()
      newBarbecue.barbecueId = barbecueId
      newBarbecue.accountId = accountId
      newBarbecue.date = new Date().toISOString()
      const barbecueResult = await sut.save(newBarbecue)
      expect(barbecueResult).toBeTruthy()
      expect(barbecueResult.id).toBeTruthy()
      expect(barbecueResult.date).toEqual(new Date(newBarbecue.date))
      expect(barbecueResult.description).toEqual(newBarbecue.description)
      expect(barbecueResult.observation).toEqual(newBarbecue.observation)
      expect(barbecueResult.valueSuggestDrink).toEqual(newBarbecue.valueSuggestDrink)
      expect(barbecueResult.valueSuggestFood).toEqual(newBarbecue.valueSuggestFood)
    })
  })

  describe('loadAll', () => {
    test('Should return a list of barbecues on success', async () => {
      const sut = makeSut()
      const { accountId } = await makeAccessToken()
      const barbecues: barbecueParams[] = [{
        barbecueId: new ObjectID().toHexString(),
        accountId,
        date: '2020-01-08',
        description: 'any_description',
        observation: 'any_observation',
        valueSuggestDrink: 0,
        valueSuggestFood: 0
      }, {
        barbecueId: new ObjectID().toHexString(),
        accountId,
        date: '2020-02-08',
        description: 'other_description',
        observation: 'other_observation',
        valueSuggestDrink: 0,
        valueSuggestFood: 0
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
