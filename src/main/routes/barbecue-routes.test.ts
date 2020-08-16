import app from '@/main/config/app'
import { MongoHelper } from '@/infra/db/mongodb'
import { makeAccessToken, mockBarbecueParams, makeBarbecue } from '@/infra/db/mongodb/test'
import { Collection, ObjectID } from 'mongodb'
import request from 'supertest'

let barbecueCollection: Collection
let accountCollection: Collection

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
        .send(mockBarbecueParams(null))
        .expect(403)
    })

    test('Should return 200 on save barbecue with valid accessToken', async () => {
      const { accessToken, accountId } = await makeAccessToken(accountCollection)
      const barbecue = mockBarbecueParams(accountId)
      await request(app)
        .put('/api/barbecue/')
        .set('x-access-token', accessToken)
        .send(barbecue)
        .expect(200)
    })

    test('Should save exists barbecue and return 200', async () => {
      const { accessToken, accountId } = await makeAccessToken(accountCollection)
      const barbecueId = await makeBarbecue(barbecueCollection, accountId)
      const barbecue = mockBarbecueParams(accountId)
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
      const { accessToken, accountId } = await makeAccessToken(accountCollection)
      await makeBarbecue(barbecueCollection, accountId)
      await request(app)
        .get('/api/barbecue')
        .set('x-access-token', accessToken)
        .send()
        .expect(200)
    })

    test('Should return 204 if barbecues is empty', async () => {
      const { accessToken } = await makeAccessToken(accountCollection)
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

    test('Should return 200 on success', async () => {
      const { accessToken, accountId } = await makeAccessToken(accountCollection)
      const barbecueId = await makeBarbecue(barbecueCollection, accountId)
      await request(app)
        .get(`/api/barbecue/${barbecueId}/`)
        .set('x-access-token', accessToken)
        .send()
        .expect(200)
    })

    test('Should return 403 if barbecue id wrong', async () => {
      const { accessToken } = await makeAccessToken(accountCollection)
      const barbecueId = new ObjectID().toHexString()
      await request(app)
        .get(`/api/barbecue/${barbecueId}/`)
        .set('x-access-token', accessToken)
        .send()
        .expect(403)
    })
  })
})
