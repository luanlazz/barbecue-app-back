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

  describe('loadAll', () => {
    test('Should return a list of barbecues on success', async () => {
      const sut = makeSut()
      await barbecueCollection.insertMany([{
        barbecueId: 'any_barbecue_id',
        accountId: 'same_account_id',
        date: new Date('2020-01-08'),
        description: 'any_description',
        observation: 'any_observation',
        valueTotalDrink: 0,
        valueTotalFood: 0
      }, {
        barbecueId: 'other_barbecue_id',
        accountId: 'same_account_id',
        date: new Date('2020-02-08'),
        description: 'other_description',
        observation: 'other_observation',
        valueTotalDrink: 0,
        valueTotalFood: 0
      }])
      const barbecueResult = await sut.loadAll('same_account_id')
      expect(barbecueResult.length).toBe(2)
      expect(barbecueResult[0]).toBeTruthy()
      expect(barbecueResult[1]).toBeTruthy()
      expect(barbecueResult[0].id).toBeTruthy()
      expect(barbecueResult[1].id).toBeTruthy()
    })

    test('Should return a empty list if no find any barbecue', async () => {
      const sut = makeSut()
      const barbecueResult = await sut.loadAll('any_account_id')
      expect(barbecueResult.length).toBe(0)
    })
  })
})
