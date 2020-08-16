import { makeSignUpController, makeLoginController } from '@/main/factories/controllers'
import { adaptRoute } from '@/main/adapters/express-route-adapter'
import { Router } from 'express'

export default (route: Router): void => {
  route.post('/signup', adaptRoute(makeSignUpController()))
  route.post('/login', adaptRoute(makeLoginController()))
}
