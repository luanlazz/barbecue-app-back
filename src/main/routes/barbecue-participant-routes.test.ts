import env from '@/main/config/env'
import app from '@/main/config/app'
import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'
import { mockAddAccountParams, mockParticipantParams } from '@/domain/test'
import { Collection, ObjectID } from 'mongodb'
import { sign } from 'jsonwebtoken'
import request from 'supertest'

let accountCollection: Collection
let barbecueCollection: Collection
let participantsCollection: Collection

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

const makeBarbecue = async (valueTotalDrink: number = 0, valueTotalFood: number = 0): Promise<string> => {
  const barbecue = {
    accountId: '5f1b89c1480b9674bd2d724c',
    date: '25/08/2020',
    description: 'Primeiro churras!',
    observation: 'teste',
    valueTotalDrink,
    valueTotalFood
  }

  const res = await barbecueCollection.insertOne(barbecue)
  return res.ops[0]._id
}

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
    test('Should return 403 on save participant without accessToken', async () => {
      await request(app)
        .put('/api/barbecue/any_barbecue_id/participants')
        .send(mockParticipantParams())
        .expect(403)
    })

    test('Should save a participant on success', async () => {
      const barbecueId = await makeBarbecue()
      const participant = mockParticipantParams()
      const { accessToken } = await makeAccessToken()
      await request(app)
        .put(`/api/barbecue/${barbecueId}/participants`)
        .set('x-access-token', accessToken)
        .send(participant)
        .expect(200)
    })

    test('Should update a participant on success', async () => {
      const barbecueId = await makeBarbecue()
      const participant = mockParticipantParams()
      participant.barbecueId = barbecueId
      const res = await participantsCollection.insertOne(participant)
      const participantId = res.ops[0]._id
      const { accessToken } = await makeAccessToken()
      await request(app)
        .put(`/api/barbecue/${barbecueId}/participants/${participantId}`)
        .set('x-access-token', accessToken)
        .send(participant)
        .expect(200)
    })
  })

  describe('LoadBarbecues route', () => {
    test('Should return 403 on load participants without accessToken', async () => {
      const barbecueId = new ObjectID().toHexString()
      await request(app)
        .get(`/api/barbecue/${barbecueId}/participants`)
        .send()
        .expect(403)
    })

    test('Should return 200 on success', async () => {
      const { accessToken } = await makeAccessToken()
      const barbecueId = await makeBarbecue()
      await participantsCollection.insertMany([{
        barbecueId,
        name: 'any_name',
        food: true,
        drink: true,
        pay: false,
        value: 10
      }, {
        barbecueId,
        name: 'any_name',
        food: true,
        drink: true,
        pay: false,
        value: 20
      }, {
        barbecueId,
        name: 'any_name',
        food: true,
        drink: true,
        pay: false,
        value: 30
      }])
      await request(app)
        .get(`/api/barbecue/${barbecueId}/participants`)
        .set('x-access-token', accessToken)
        .send()
        .expect(200)
    })
  })
})
