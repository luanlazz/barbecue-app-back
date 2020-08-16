import app from '@/main/config/app'
import { MongoHelper } from '@/infra/db/mongodb'
import { makeAccessToken, makeBarbecue, makeParticipant, mockParticipantParams, makeParticipants } from '@/infra/db/mongodb/test'
import { Collection, ObjectID } from 'mongodb'
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
    test('Should return 403 on save participant without accessToken', async () => {
      await request(app)
        .put('/api/barbecue/any_barbecue_id/participants')
        .send(mockParticipantParams(null))
        .expect(403)
    })

    test('Should save a participant on success', async () => {
      const { accessToken, accountId } = await makeAccessToken(accountCollection)
      const barbecueId = await makeBarbecue(barbecueCollection, accountId)
      const participant = mockParticipantParams(barbecueId)
      await request(app)
        .put(`/api/barbecue/${barbecueId}/participants/`)
        .set('x-access-token', accessToken)
        .send(participant)
        .expect(200)
    })

    test('Should update a participant on success', async () => {
      const { accessToken, accountId } = await makeAccessToken(accountCollection)
      const barbecueId = await makeBarbecue(barbecueCollection, accountId)
      const participantId = await makeParticipant(participantsCollection, barbecueId)
      const participant = mockParticipantParams(barbecueId)
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
        .get(`/api/barbecue/${barbecueId}/participants/`)
        .send()
        .expect(403)
    })

    test('Should return 200 on success', async () => {
      const { accessToken, accountId } = await makeAccessToken(accountCollection)
      const barbecueId = await makeBarbecue(barbecueCollection, accountId)
      await makeParticipants(participantsCollection, barbecueId)
      await request(app)
        .get(`/api/barbecue/${barbecueId}/participants/`)
        .set('x-access-token', accessToken)
        .send()
        .expect(200)
    })

    test('Should return 200 on success', async () => {
      const { accessToken, accountId } = await makeAccessToken(accountCollection)
      const barbecueId = await makeBarbecue(barbecueCollection, accountId)
      await request(app)
        .get(`/api/barbecue/${barbecueId}/participants/`)
        .set('x-access-token', accessToken)
        .send()
        .expect(204)
    })
  })

  describe('Remove participant', () => {
    test('Should return 403 on remove participant without accessToken', async () => {
      await request(app)
        .delete('/api/barbecue/any_barbecue_id/participants/any_participant_id')
        .send(mockParticipantParams(null))
        .expect(403)
    })

    test('Should remove a participant on success', async () => {
      const { accessToken, accountId } = await makeAccessToken(accountCollection)
      const barbecueId = await makeBarbecue(barbecueCollection, accountId)
      const participantId = await makeParticipant(participantsCollection, barbecueId)
      await request(app)
        .delete(`/api/barbecue/${barbecueId}/participants/${participantId}`)
        .set('x-access-token', accessToken)
        .send()
        .expect(204)
    })
  })
})
