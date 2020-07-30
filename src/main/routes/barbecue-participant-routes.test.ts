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

const makeBarbecue = async (accountId: string): Promise<string> => {
  const barbecue = {
    accountId,
    date: '25/08/2020',
    description: 'Primeiro churras!',
    observation: 'teste',
    numParticipants: 0,
    valueSuggestDrink: 100,
    valueSuggestFood: 100,
    valueTotal: 0,
    valueCollected: 0
  }

  const res = await barbecueCollection.insertOne(barbecue)
  return res.ops[0]._id
}

const makeParticipant = async (barbecueId: string): Promise<string> => {
  const participant = {
    barbecueId,
    name: 'any_name',
    pay: false,
    value: 10
  }

  const res = await participantsCollection.insertOne(participant)
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
      const { accessToken, accountId } = await makeAccessToken()
      const participant = mockParticipantParams()
      const barbecueId = await makeBarbecue(accountId)
      await request(app)
        .put(`/api/barbecue/${barbecueId}/participants`)
        .set('x-access-token', accessToken)
        .send(participant)
        .expect(200)
    })

    test('Should update a participant on success', async () => {
      const { accessToken, accountId } = await makeAccessToken()
      const barbecueId = await makeBarbecue(accountId)
      const participant = mockParticipantParams()
      participant.barbecueId = barbecueId
      const res = await participantsCollection.insertOne(participant)
      const participantId = res.ops[0]._id
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
      const { accessToken, accountId } = await makeAccessToken()
      const barbecueId = await makeBarbecue(accountId)
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

    test('Should return 200 on success', async () => {
      const { accessToken, accountId } = await makeAccessToken()
      const barbecueId = await makeBarbecue(accountId)
      await request(app)
        .get(`/api/barbecue/${barbecueId}/participants`)
        .set('x-access-token', accessToken)
        .send()
        .expect(204)
    })
  })

  describe('Remove participant', () => {
    test('Should return 403 on remove participant without accessToken', async () => {
      await request(app)
        .delete('/api/barbecue/any_barbecue_id/participants/any_participant_id')
        .send(mockParticipantParams())
        .expect(403)
    })

    test('Should remove a participant on success', async () => {
      const { accessToken, accountId } = await makeAccessToken()
      const barbecueId = await makeBarbecue(accountId)
      const participantId = await makeParticipant(barbecueId)
      await request(app)
        .delete(`/api/barbecue/${barbecueId}/participants/${participantId}`)
        .set('x-access-token', accessToken)
        .send()
        .expect(204)
    })
  })
})
