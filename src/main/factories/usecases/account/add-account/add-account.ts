import { AddAccount } from '@/domain/usecases/account/add-account'
import { BcryptAdapter } from '@/infra/cryptography'
import { AccountMongoRepository } from '@/infra/db/mongodb'
import { DbAddAccount } from '@/data/usecases'

export const makeDbAddAccount = (): AddAccount => {
  const salt = 12
  const hasher = new BcryptAdapter(salt)
  const addAccountRepository = new AccountMongoRepository()
  const loadAccountRepository = new AccountMongoRepository()
  return new DbAddAccount(hasher, addAccountRepository, loadAccountRepository)
}
