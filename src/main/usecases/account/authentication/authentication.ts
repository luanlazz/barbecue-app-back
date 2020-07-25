import { Authentication } from '@/domain/usecases/account/authentication'
import { AccountMongoRepository } from '@/infra/db/mongodb/account-repository/account'
import { BcryptAdapter } from '@/infra/cryptography/bcrypt-adapter/bcrypt-adapter'
import { JwtAdapter } from '@/infra/cryptography/jwt-adapter/jwt-adapter'
import { DbAuthentication } from '@/data/usecases/account/authentication/db-authentication'

export const makeAuthentication = (): Authentication => {
  const loadAccountRepository = new AccountMongoRepository()
  const salt = 12
  const hasher = new BcryptAdapter(salt)
  const jwt = new JwtAdapter(process.env.JWT_SECRET)
  const updateAccessToken = new AccountMongoRepository()
  return new DbAuthentication(loadAccountRepository, hasher, jwt, updateAccessToken)
}
