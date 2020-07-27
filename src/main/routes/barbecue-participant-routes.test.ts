import app from '@/main/config/app'
import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'
import { mockParticipantParams } from '@/domain/test'
import { Collection } from 'mongodb'
import request from 'supertest'

let accountCollection: Collection
let barbecueCollection: Collection
let participantsCollection: Collection

describe('Participants Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
    barbecueCollection = await MongoHelper.getCollection('barbecues')
    await barbecueCollection.deleteMany({})
    participantsCollection = await MongoHelper.getCollection('participants')
    await participantsCollection.deleteMany({})
  })

  describe('Save participant', () => {
    test('Should return 403 on save save participant without accessToken', async () => {
      await request(app)
        .put('/api/barbecue/123123123/participants')
        .send(mockParticipantParams())
        .expect(403)
    })
  })
})
