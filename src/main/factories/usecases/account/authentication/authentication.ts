import env from '@/main/config/env'
import { Authentication } from '@/domain/usecases'
import { AccountMongoRepository } from '@/infra/db/mongodb'
import { BcryptAdapter, JwtAdapter } from '@/infra/cryptography'
import { DbAuthentication } from '@/data/usecases'

export const makeAuthentication = (): Authentication => {
  const loadAccountRepository = new AccountMongoRepository()
  const salt = 12
  const hasher = new BcryptAdapter(salt)
  const jwt = new JwtAdapter(env.jwtSecret)
  const updateAccessToken = new AccountMongoRepository()
  return new DbAuthentication(loadAccountRepository, hasher, jwt, updateAccessToken)
}
