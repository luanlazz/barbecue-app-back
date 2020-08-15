import app from '@/main/config/app'
import { MongoHelper } from '@/infra/db/mongodb'
import { mockAccountModel } from '@/domain/test'
import { Collection } from 'mongodb'
import { hash } from 'bcrypt'
import request from 'supertest'

let accountCollection: Collection

describe('SignUp Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  describe('SignUp route', () => {
    test('Should return an account on success', async () => {
      await request(app)
        .post('/api/signup')
        .send({
          name: 'luan',
          email: 'luan@mail.com',
          password: '12345',
          passwordConfirmation: '12345'
        })
        .expect(200)
    })
  })

  describe('Login route', () => {
    test('Should return an account on success', async () => {
      const fakeAccount = mockAccountModel()
      const hashPassword = await hash(fakeAccount.password, 12)
      await accountCollection.insertOne({
        name: fakeAccount.name,
        email: fakeAccount.email,
        password: hashPassword
      })
      await request(app)
        .post('/api/login')
        .send({
          email: fakeAccount.email,
          password: fakeAccount.password
        })
        .expect(200)
    })
  })
})
