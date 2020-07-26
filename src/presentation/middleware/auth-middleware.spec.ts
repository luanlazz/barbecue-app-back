import { AuthMiddleware } from './auth-middleware'
import { AccessDeniedError } from '@/presentation/errors'
import { forbidden } from '@/presentation/helpers/http/http-helper'
import { HttpRequest } from '../protocols/http'
import { LoadAccountByToken } from '@/domain/usecases/account/load-account-by-token'
import { mockLoadAccountByToken } from '../test'

const mockRequest = (): HttpRequest => ({
  headers: {
    'x-access-token': 'any_token'
  }
})

type SutTypes = {
  sut: AuthMiddleware
  loadAccountByTokenStub: LoadAccountByToken
}

const makeSut = (role?: string): SutTypes => {
  const loadAccountByTokenStub = mockLoadAccountByToken()
  const sut = new AuthMiddleware(loadAccountByTokenStub)
  return {
    sut,
    loadAccountByTokenStub
  }
}

describe('Auth Middleware', () => {
  test('Should return 403 if no x-access-token exists in headers', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(forbidden(new AccessDeniedError()))
  })

  test('Should call loadAccountByToken with correct access-token', async () => {
    const { sut, loadAccountByTokenStub } = makeSut()
    const loadSpy = jest.spyOn(loadAccountByTokenStub, 'loadByToken')
    await sut.handle(mockRequest())
    expect(loadSpy).toHaveBeenCalledWith('any_token')
  })
})
