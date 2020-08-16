import { BarbecueMongoRepository } from './barbecue'
import { MongoHelper } from '@/infra/db/mongodb'
import { makeAccessToken, mockBarbecueParams, makeBarbecue, makeBarbecues } from '@/infra/db/mongodb/test'
import { Collection, ObjectID } from 'mongodb'

let barbecueCollection: Collection
let accountCollection: Collection

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
      const { accountId } = await makeAccessToken(accountCollection)
      const barbecueParams = mockBarbecueParams(accountId)
      barbecueParams.barbecueId = null
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
      const { accountId } = await makeAccessToken(accountCollection)
      const barbecueId = await makeBarbecue(barbecueCollection, accountId)
      const newBarbecue = mockBarbecueParams(accountId)
      newBarbecue.barbecueId = barbecueId
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
      const { accountId } = await makeAccessToken(accountCollection)
      await makeBarbecues(barbecueCollection, accountId)
      const barbecueResult = await sut.loadAll(accountId)
      expect(barbecueResult.length).toBe(2)
      expect(barbecueResult[0]).toBeTruthy()
      expect(barbecueResult[1]).toBeTruthy()
      expect(barbecueResult[0].id).toBeTruthy()
      expect(barbecueResult[1].id).toBeTruthy()
    })

    test('Should return a empty list if no find any barbecue', async () => {
      const sut = makeSut()
      const { accountId } = await makeAccessToken(accountCollection)
      const barbecueResult = await sut.loadAll(accountId)
      expect(barbecueResult.length).toBe(0)
    })
  })

  describe('loadById', () => {
    test('Should return a barbecue on success', async () => {
      const sut = makeSut()
      const { accountId } = await makeAccessToken(accountCollection)
      const barbecueId = await makeBarbecue(barbecueCollection, accountId)
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
