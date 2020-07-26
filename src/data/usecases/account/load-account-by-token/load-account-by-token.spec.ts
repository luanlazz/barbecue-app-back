import { DbLoadAccountByToken } from './load-account-by-token'
import { LoadAccountByToken } from '@/domain/usecases/account/load-account-by-token'
import { mockLoadAccountByTokenRepository } from '@/data/test'
import { throwError } from '@/domain/test'

type SutTypes = {
  sut: DbLoadAccountByToken
  loadAccountByTokenStub: LoadAccountByToken
}

const makeSut = (): SutTypes => {
  const loadAccountByTokenStub = mockLoadAccountByTokenRepository()
  const sut = new DbLoadAccountByToken(loadAccountByTokenStub)
  return {
    sut,
    loadAccountByTokenStub
  }
}

describe('Authentication use case', () => {
  test('Should call LoadAccountByEmailRepository with correct email', async () => {
    const { sut, loadAccountByTokenStub } = makeSut()
    const loadByTokenSpy = jest.spyOn(loadAccountByTokenStub, 'loadByToken')
    await sut.loadByToken('any_token')
    expect(loadByTokenSpy).toHaveBeenCalledWith('any_token')
  })

  test('Should throws if LoadAccountByEmailRepository throws', async () => {
    const { sut, loadAccountByTokenStub } = makeSut()
    jest.spyOn(loadAccountByTokenStub, 'loadByToken').mockImplementation(throwError)
    const error = sut.loadByToken('any_token')
    await expect(error).rejects.toThrow()
  })
})
