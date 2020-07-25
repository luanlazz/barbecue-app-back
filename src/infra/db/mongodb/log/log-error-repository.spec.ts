import { LogMongoRepository } from './log-error-repository'
import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'
import { Collection } from 'mongodb'

let logErrorCollection: Collection

describe('LogError repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    logErrorCollection = await MongoHelper.getCollection('logErrors')
    await logErrorCollection.deleteMany({})
  })

  const makeSut = (): LogMongoRepository => {
    return new LogMongoRepository()
  }

  test('Should', async () => {
    const sut = makeSut()
    await sut.log('any_error')
    const count = await logErrorCollection.countDocuments()
    expect(count).toBe(1)
  })
})
