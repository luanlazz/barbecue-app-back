import { Controller } from '@/presentation/protocols/controller'
import { makeDbAddAccount } from '@/main/factories/usecases/account/add-account/add-account'
import { makeSignUpValidation } from './signup-validation-factory'
import { makeAuthentication } from '@/main/factories/usecases/account/authentication/authentication'
import { SignUpController } from '@/presentation/controllers/login/signup/signup-controller'
import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory'

export const makeSignUpController = (): Controller => {
  const controller = new SignUpController(makeDbAddAccount(), makeSignUpValidation(), makeAuthentication())
  return makeLogControllerDecorator(controller)
}
