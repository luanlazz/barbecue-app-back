import { BarbecueMongoRepository } from './barbecue'
import { mockBarbecueParams } from '@/domain/test'
import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'
import { Collection } from 'mongodb'

let barbecueCollection: Collection

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
  })

  const makeSut = (): BarbecueMongoRepository => {
    return new BarbecueMongoRepository()
  }

  describe('save', () => {
    test('Should return an barbecue on success', async () => {
      const sut = makeSut()
      const barbecueParams = mockBarbecueParams()
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
})
