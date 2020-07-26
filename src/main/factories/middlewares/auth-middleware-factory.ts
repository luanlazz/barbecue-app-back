import { Middleware } from '@/presentation/protocols/middleware'
import { AuthMiddleware } from '@/presentation/middleware/auth-middleware'
import { makeDbLoadAccountByToken } from '../usecases/account/load-account-by-token/load-account-by-token'

export const makeAuthMiddleware = (): Middleware => {
  return new AuthMiddleware(makeDbLoadAccountByToken())
}
