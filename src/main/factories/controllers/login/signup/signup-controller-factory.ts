import { makeSignUpValidation } from './signup-validation-factory'
import { makeDbAddAccount, makeAuthentication } from '@/main/factories/usecases'
import { makeLogControllerDecorator } from '@/main/factories/decorators'
import { SignUpController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'

export const makeSignUpController = (): Controller => {
  const controller = new SignUpController(makeDbAddAccount(), makeSignUpValidation(), makeAuthentication())
  return makeLogControllerDecorator(controller)
}
