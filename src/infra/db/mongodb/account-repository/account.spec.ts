import { AccountMongoRepository } from './account'
import { mockAddAccountParams } from '@/domain/test'
import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'

describe('Account Mongo Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  test('Should return an account on success', async () => {
    const sut = new AccountMongoRepository()
    const accountParam = mockAddAccountParams()
    const account = await sut.add(accountParam)
    expect(account).toBeTruthy()
    expect(account.id).toBeTruthy()
    expect(account.name).toEqual(accountParam.name)
    expect(account.email).toEqual(accountParam.email)
    expect(account.password).toEqual(accountParam.password)
  })
})
