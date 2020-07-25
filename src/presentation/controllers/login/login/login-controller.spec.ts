import { LoginController } from './login-controller'
import { HttpRequest } from '@/presentation/protocols/http'
import { mockValidation } from '@/presentation/test'
import { Validation } from '@/presentation/protocols/validation'
import { MissingParamError } from '@/presentation/errors'
import { badRequest } from '@/presentation/helpers/http/http-helper'

type SutTypes = {
  sut: LoginController
  validationStub: Validation
}

const makeSut = (): SutTypes => {
  const validationStub = mockValidation()
  const sut = new LoginController(validationStub)
  return {
    sut,
    validationStub
  }
}

const mockRequest = (): HttpRequest => ({
  body: {
    email: 'any_email@mail.com',
    password: 'any_password'
  }
})

describe('SignUp Controller', () => {
  test('should call validate with correct values', async () => {
    const { sut, validationStub } = makeSut()
    const validateSpy = jest.spyOn(validationStub, 'validate')
    await sut.handle(mockRequest())
    expect(validateSpy).toHaveBeenCalledWith({
      email: 'any_email@mail.com',
      password: 'any_password'
    })
  })

  test('should return 400 if validate return an error', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new MissingParamError('email'))
    const error = await sut.handle(mockRequest())
    expect(error).toEqual(badRequest(new MissingParamError('email')))
  })
})
