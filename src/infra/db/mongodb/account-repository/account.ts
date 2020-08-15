import { AddAccountRepository, LoadAccountByEmailRepository, UpdateAccessTokenRepository, LoadAccountByTokenRepository } from '@/data/protocols/db'
import { AddAccountParams } from '@/domain/usecases'
import { AccountModel } from '@/domain/models'
import { MongoHelper } from '@/infra/db/mongodb'

export class AccountMongoRepository implements AddAccountRepository,
                                               LoadAccountByEmailRepository,
                                               LoadAccountByTokenRepository,
                                               UpdateAccessTokenRepository {
  async add (accountData: AddAccountParams): Promise<AccountModel> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    const result = await accountCollection.insertOne(accountData)
    return MongoHelper.map(result.ops[0])
  }

  async loadByEmail (email: string): Promise<AccountModel> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    const account = await accountCollection.findOne({ email: email })
    return account && MongoHelper.map(account)
  }

  async loadByToken (token: string): Promise<AccountModel> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    const account = await accountCollection.findOne({ accessToken: token })
    return account && MongoHelper.map(account)
  }

  async updateAccessToken (id: string, accessToken: string): Promise<void> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.updateOne({ _id: id }, {
      $set: {
        accessToken: accessToken
      }
    })
  }
}
