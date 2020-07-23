import { DbAddAccountRepository } from '@/data/protocols/db/account/db-add-account-repository'
import { DbLoadAccountByEmailRepository } from '@/data/protocols/db/account/db-load-account-by-email-repository'
import { AccountModel } from '@/domain/models/account'
import { mockAccountModel } from '@/domain/test'
import { AddAccountParams } from '@/domain/usecases/account/add-account'

export const mockAddAccountRepository = (): DbAddAccountRepository => {
  class DbAddAccountRepositoryStub implements DbAddAccountRepository {
    async add (accountData: AddAccountParams): Promise<AccountModel> {
      return Promise.resolve(mockAccountModel())
    }
  }
  return new DbAddAccountRepositoryStub()
}

export const mockLoadAccountByEmailRepository = (): DbLoadAccountByEmailRepository => {
  class DbLoadAccountByEmailRepositoryStub implements DbLoadAccountByEmailRepository {
    async loadByEmail (email: string): Promise<AccountModel> {
      return Promise.resolve(null)
    }
  }
  return new DbLoadAccountByEmailRepositoryStub()
}
