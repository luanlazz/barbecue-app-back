import env from '@/main/config/env'
import app from '@/main/config/app'
import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'
import { mockAddAccountParams, mockBarbecueParams } from '@/domain/test'
import { barbecueParams } from '@/domain/usecases/barbecue/save-barbecue'
import { Collection, ObjectID } from 'mongodb'
import { sign } from 'jsonwebtoken'
import request from 'supertest'

let barbecueCollection: Collection
let accountCollection: Collection

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

const makeBarbecue = async (accountId: string = new ObjectID().toHexString()): Promise<string> => {
  const barbecue: barbecueParams = {
    barbecueId: new ObjectID().toHexString(),
    accountId,
    date: new Date('25/08/2020'),
    description: 'Primeiro churras!',
    observation: 'teste',
    numParticipants: 0,
    valueSuggestDrink: 0,
    valueSuggestFood: 0,
    valueTotal: 0,
    valueCollected: 0
  }

  const res = await barbecueCollection.insertOne(barbecue)
  return res.ops[0]._id
}

describe('Barbecue Routes', () => {
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

  describe('Save route', () => {
    test('Should return 403 on save barbecue without accessToken', async () => {
      await request(app)
        .put('/api/barbecue/')
        .send(mockBarbecueParams())
        .expect(403)
    })

    test('Should return 200 on save barbecue with valid accessToken', async () => {
      const { accessToken } = await makeAccessToken()
      const barbecue = {
        date: new Date('01/08/2020'),
        description: 'any_description',
        observation: 'any_observation',
        numParticipants: 0,
        valueSuggestDrink: 100,
        valueSuggestFood: 100,
        valueTotal: 0,
        valueCollected: 0
      }
      await request(app)
        .put('/api/barbecue/')
        .set('x-access-token', accessToken)
        .send(barbecue)
        .expect(200)
    })

    test('Should save exists barbecue and return 200', async () => {
      const { accessToken, accountId } = await makeAccessToken()
      const barbecueId = await makeBarbecue(accountId)
      const barbecue = {
        date: new Date('01/08/2020'),
        description: 'other_description',
        observation: 'other_observation',
        numParticipants: 0,
        valueSuggestDrink: 100,
        valueSuggestFood: 100,
        valueTotal: 0,
        valueCollected: 0
      }
      await request(app)
        .put(`/api/barbecue/${barbecueId}`)
        .set('x-access-token', accessToken)
        .send(barbecue)
        .expect(200)
    })
  })

  describe('LoadBarbecues route', () => {
    test('Should return 403 on load barbecues without accessToken', async () => {
      await request(app)
        .get('/api/barbecue')
        .send()
        .expect(403)
    })

    test('Should return 200 on success', async () => {
      const { accessToken, accountId } = await makeAccessToken()
      await makeBarbecue(accountId)
      await request(app)
        .get('/api/barbecue')
        .set('x-access-token', accessToken)
        .send()
        .expect(200)
    })

    test('Should return 204 if barbecues is empty', async () => {
      const { accessToken } = await makeAccessToken()
      await request(app)
        .get('/api/barbecue')
        .set('x-access-token', accessToken)
        .send()
        .expect(204)
    })
  })

  describe('LoadBarbecueById route', () => {
    test('Should return 403 on load barbecues without accessToken', async () => {
      await request(app)
        .get('/api/barbecue/any_barbecue_id')
        .send()
        .expect(403)
    })
  })
})
