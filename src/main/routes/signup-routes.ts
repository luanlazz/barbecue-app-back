import { makeSignUpController } from '@/main/factories/controllers/login/signup/signup-controller-factory'
import { makeLoginController } from '@/main/factories/controllers/login/login/login-controller-factory'
import { adaptRoute } from '@/main/adapters/express-route-adapter'
import { Router } from 'express'

export default (route: Router): void => {
  route.post('/signup', adaptRoute(makeSignUpController()))
  route.post('/login', adaptRoute(makeLoginController()))
}
