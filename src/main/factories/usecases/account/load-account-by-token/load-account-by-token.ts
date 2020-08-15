import env from '@/main/config/env'
import { LoadAccountByToken } from '@/domain/usecases'
import { DbLoadAccountByToken } from '@/data/usecases'
import { JwtAdapter } from '@/infra/cryptography'
import { AccountMongoRepository } from '@/infra/db/mongodb'

export const makeDbLoadAccountByToken = (): LoadAccountByToken => {
  const decrypter = new JwtAdapter(env.jwtSecret)
  const loadAccountByToken = new AccountMongoRepository()
  return new DbLoadAccountByToken(decrypter, loadAccountByToken)
}
