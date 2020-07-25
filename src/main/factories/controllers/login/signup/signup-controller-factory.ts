import { Controller } from '@/presentation/protocols/controller'
import { makeDbAddAccount } from '@/main/factories/usecases/account/add-account/add-account'
import { makeSignUpValidation } from './signup-validation-factory'
import { makeAuthentication } from '@/main/factories/usecases/account/authentication/authentication'
import { SignUpController } from '@/presentation/controllers/login/signup/signup-controller'

export const makeSignUpController = (): Controller => {
  return new SignUpController(makeDbAddAccount(), makeSignUpValidation(), makeAuthentication())
}
