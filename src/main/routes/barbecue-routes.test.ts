import env from '@/main/config/env'
import app from '@/main/config/app'
import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'
import { mockAddAccountParams, mockBarbecueParams } from '@/domain/test'
import { Collection } from 'mongodb'
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
        .put('/api/barbecue')
        .send(mockBarbecueParams())
        .expect(403)
    })
  })

  describe('LoadBarbecues route', () => {
    test('Should return 403 on load barbecues without accessToken', async () => {
      await request(app)
        .get('/api/barbecue')
        .send(mockBarbecueParams())
        .expect(403)
    })

    test('Should return 200 on success', async () => {
      const { accessToken, accountId } = await makeAccessToken()
      const barbecueBase = mockBarbecueParams()
      barbecueBase.accountId = accountId
      await barbecueCollection.insertOne(barbecueBase)
      await request(app)
        .get('/api/barbecue')
        .set('x-access-token', accessToken)
        .send(mockBarbecueParams())
        .expect(200)
    })

    test('Should return 204 if barbecues is empty', async () => {
      const { accessToken } = await makeAccessToken()
      await request(app)
        .get('/api/barbecue')
        .set('x-access-token', accessToken)
        .send(mockBarbecueParams())
        .expect(204)
    })
  })
})
