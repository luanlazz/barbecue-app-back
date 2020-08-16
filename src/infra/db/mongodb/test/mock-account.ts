import env from '@/main/config/env'
import { Collection } from 'mongodb'
import faker from 'faker'
import { sign } from 'jsonwebtoken'

export const mockAccountParams = (): any => ({
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password()
})

export const makeAccount = async (collection: Collection): Promise<any> => {
  const res = await collection.insertOne(mockAccountParams())
  return res.ops[0]
}

type mockAccount = {
  accessToken: string
  accountId: string
}

export const makeAccessToken = async (collection: Collection): Promise<mockAccount> => {
  const res = await collection.insertOne(mockAccountParams())
  const id = res.ops[0]._id
  const accessToken = sign({ id }, env.jwtSecret)
  await collection.updateOne({
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
