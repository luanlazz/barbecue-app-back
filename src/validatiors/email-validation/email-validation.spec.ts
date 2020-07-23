import { EmailValidation } from './email-validation'
import { InvalidParamError } from '@/presentation/errors'

const makeSut = (): EmailValidation => {
  return new EmailValidation('email')
}

describe('EmailValidation Validation', () => {
  test('Should return a InvalidParamError if validation fails', () => {
    const sut = makeSut()
    const error = sut.validate({ email: 'invalid_email' })
    expect(error).toEqual(new InvalidParamError('email'))
  })
})
