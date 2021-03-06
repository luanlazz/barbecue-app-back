import { EmailValidatorAdapter } from './email-validator-adapter'
import validator from 'validator'
import faker from 'faker'

jest.mock('validator', () => ({
  isEmail (): Boolean {
    return true
  }
}))

const makeSut = (): EmailValidatorAdapter => {
  return new EmailValidatorAdapter()
}

describe('EmailValidatorAdapter adapter', () => {
  test('Should calls validator with correct email', () => {
    const sut = makeSut()
    const isEmailSpy = jest.spyOn(validator, 'isEmail')
    const email = faker.internet.email()
    sut.isValid(email)
    expect(isEmailSpy).toHaveBeenCalledWith(email)
  })

  test('Should return false if email is invalid', () => {
    const sut = makeSut()
    jest.spyOn(validator, 'isEmail').mockReturnValueOnce(false)
    const isValid = sut.isValid(faker.internet.email())
    expect(isValid).toBeFalsy()
  })

  test('Should return true if email is valid', () => {
    const sut = makeSut()
    const isValid = sut.isValid(faker.internet.email())
    expect(isValid).toBeTruthy()
  })
})
