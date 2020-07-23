import { AccountMongoRepository } from './account'
import { mockAddAccountParams } from '@/domain/test'
import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'
import { Collection } from 'mongodb'

let accountCollection: Collection

describe('Account Mongo Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    accountCollection = MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  const makeSut = (): AccountMongoRepository => {
    return new AccountMongoRepository()
  }

  describe('add', () => {
    test('Should return an account on success', async () => {
      const sut = makeSut()
      const accountParam = mockAddAccountParams()
      const account = await sut.add(accountParam)
      expect(account).toBeTruthy()
      expect(account.id).toBeTruthy()
      expect(account.name).toEqual(accountParam.name)
      expect(account.email).toEqual(accountParam.email)
      expect(account.password).toEqual(accountParam.password)
    })
  })

  describe('loadByEmail', () => {
    test('Should return an account on loadByEmail success', async () => {
      const sut = makeSut()
      const accountInsert = mockAddAccountParams()
      await accountCollection.insertOne(accountInsert)
      const account = await sut.loadByEmail(accountInsert.email)
      expect(account).toBeTruthy()
      expect(account.name).toBe(accountInsert.name)
      expect(account.email).toBe(accountInsert.email)
      expect(account.password).toBe(accountInsert.password)
    })
  })
})
