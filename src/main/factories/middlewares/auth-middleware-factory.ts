import { Middleware } from '@/presentation/protocols'
import { AuthMiddleware } from '@/presentation/middleware/auth-middleware'
import { makeDbLoadAccountByToken } from '@/main/factories/usecases'

export const makeAuthMiddleware = (): Middleware => {
  return new AuthMiddleware(makeDbLoadAccountByToken())
}
