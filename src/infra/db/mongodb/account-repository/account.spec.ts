import { AccountMongoRepository } from './account'
import { mockAccountParams, makeAccount } from '@/infra/db/mongodb/test'
import { MongoHelper } from '@/infra/db/mongodb'
import { Collection } from 'mongodb'
import faker from 'faker'

let accountCollection: Collection

describe('Account Mongo Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  const makeSut = (): AccountMongoRepository => {
    return new AccountMongoRepository()
  }

  describe('add', () => {
    test('Should return an account on success', async () => {
      const sut = makeSut()
      const accountParam = mockAccountParams()
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
      const result = await makeAccount(accountCollection)
      const account = await sut.loadByEmail(result.email)
      expect(account).toBeTruthy()
      expect(account.name).toBe(result.name)
      expect(account.email).toBe(result.email)
      expect(account.password).toBe(result.password)
    })
  })

  describe('loadByToken', () => {
    test('Should return an account on loadByToken success', async () => {
      const sut = makeSut()
      const accountInsert = await makeAccount(accountCollection)
      const account = await sut.loadByToken(accountInsert.accessToken)
      expect(account).toBeTruthy()
      expect(account.name).toBe(accountInsert.name)
      expect(account.email).toBe(accountInsert.email)
    })
  })

  describe('UpdateAccessToken', () => {
    test('Should update access token on UpdateAccessToken success', async () => {
      const sut = makeSut()
      const accountInsert = await makeAccount(accountCollection)
      expect(accountInsert.accessToken).toBeFalsy()
      const token = faker.random.uuid()
      await sut.updateAccessToken(accountInsert._id, token)
      const account = await accountCollection.findOne({ _id: accountInsert._id })
      expect(account).toBeTruthy()
      expect(account.accessToken).toBe(token)
    })
  })
})
