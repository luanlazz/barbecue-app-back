import { EmailValidator } from './email-validator-adapter'
import validator from 'validator'

describe('EmailValidator adapter', () => {
  test('Should calls validator with correct email', () => {
    const sut = new EmailValidator('email')
    const isEmailSpy = jest.spyOn(validator, 'isEmail')
    sut.validate({ email: 'any_email@mail.com' })
    expect(isEmailSpy).toHaveBeenCalledWith('any_email@mail.com')
  })
})
