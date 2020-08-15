import { makeLoginValidation } from './login-validation-factory'
import { makeAuthentication } from '@/main/factories/usecases'
import { makeLogControllerDecorator } from '@/main/factories/decorators'
import { Controller } from '@/presentation/protocols'
import { LoginController } from '@/presentation/controllers/login/login/login-controller'

export const makeLoginController = (): Controller => {
  const controller = new LoginController(makeLoginValidation(), makeAuthentication())
  return makeLogControllerDecorator(controller)
}
