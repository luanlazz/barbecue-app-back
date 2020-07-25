import { Controller } from '@/presentation/protocols/controller'
import { makeLoginValidation } from './login-validation-factory'
import { makeAuthentication } from '@/main/factories/usecases/account/authentication/authentication'
import { LoginController } from '@/presentation/controllers/login/login/login-controller'
import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory'

export const makeLoginController = (): Controller => {
  const controller = new LoginController(makeLoginValidation(), makeAuthentication())
  return makeLogControllerDecorator(controller)
}
