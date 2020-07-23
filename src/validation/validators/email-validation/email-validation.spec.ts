import { EmailValidation } from './email-validation'
import { InvalidParamError } from '@/presentation/errors'
import { EmailValidator } from '@/validation/protocols/email-validation'
import { mockEmailValidator } from '@/validation/test'
import faker from 'faker'

type SutTypes = {
  sut: EmailValidation
  emailValidatorStub: EmailValidator
}

const makeSut = (): SutTypes => {
  const emailValidatorStub = mockEmailValidator()
  const sut = new EmailValidation(emailValidatorStub, 'email')
  return {
    sut,
    emailValidatorStub
  }
}

describe('EmailValidation Validation', () => {
  test('Should EmailValidation calls emailValidator with correct email', () => {
    const { sut, emailValidatorStub } = makeSut()
    const isValidSpy = jest.spyOn(emailValidatorStub, 'isValid')
    const email = faker.internet.email()
    sut.validate({ email })
    expect(isValidSpy).toHaveBeenCalledWith(email)
  })

  test('Should return a InvalidParamError if validation fails', () => {
    const { sut, emailValidatorStub } = makeSut()
    jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false)
    const error = sut.validate({ email: 'invalid_email' })
    expect(error).toEqual(new InvalidParamError('email'))
  })

  test('Should not return if validation success', () => {
    const { sut } = makeSut()
    const error = sut.validate(faker.internet.email())
    expect(error).toBeFalsy()
  })
})
