import { makeSignUpController } from '@/main/factories/controllers/login/signup/signup-controller-factory'
import { adaptRoute } from '@/main/adapters/express-route-adapter'
import { Router } from 'express'

export default (route: Router): void => {
  route.post('/signup', adaptRoute(makeSignUpController()))
}
