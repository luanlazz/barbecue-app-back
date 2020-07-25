import { LogControllerDecorator } from './log-decorator'
import { Controller } from '@/presentation/protocols/controller'
import { HttpRequest, HttpResponse } from '@/presentation/protocols/http'
import { ok } from '@/presentation/helpers/http/http-helper'
import { mockAccountModel } from '@/domain/test'

export const mockController = (): Controller => {
  class ControllerStub implements Controller {
    async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
      return Promise.resolve(ok(mockAccountModel()))
    }
  }
  return new ControllerStub()
}

type SutTypes = {
  sut: Controller
  mockControllerStub: Controller
}

const makeSut = (): SutTypes => {
  const mockControllerStub = mockController()
  const sut = new LogControllerDecorator(mockControllerStub)
  return {
    sut,
    mockControllerStub
  }
}

const mockRequest = (): HttpRequest => ({
  body: {
    name: 'any_name',
    email: 'any_email@mail.com',
    password: 'any_pass',
    passwordConfirmation: 'any_pass'
  }
})

describe('LogController decorator', () => {
  test('Should call controller handle', async () => {
    const { sut, mockControllerStub } = makeSut()
    const handleSpy = jest.spyOn(mockControllerStub, 'handle')
    await sut.handle(mockRequest())
    expect(handleSpy).toHaveBeenCalledWith(mockRequest())
  })
})
