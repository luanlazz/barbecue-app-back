import { DbLoadAccountByToken } from './load-account-by-token'
import { Decrypter } from '@/data/protocols/cryptography/decrypter'
import { mockLoadAccountByTokenRepository, mockDecrypter } from '@/data/test'
import { LoadAccountByToken } from '@/domain/usecases/account/load-account-by-token'
import { throwError } from '@/domain/test'

type SutTypes = {
  sut: DbLoadAccountByToken
  decrypterStub: Decrypter
  loadAccountByTokenStub: LoadAccountByToken
}

const makeSut = (): SutTypes => {
  const decrypterStub = mockDecrypter()
  const loadAccountByTokenStub = mockLoadAccountByTokenRepository()
  const sut = new DbLoadAccountByToken(decrypterStub, loadAccountByTokenStub)
  return {
    sut,
    decrypterStub,
    loadAccountByTokenStub
  }
}

describe('Authentication use case', () => {
  test('Should call Decrypter with correct email', async () => {
    const { sut, decrypterStub } = makeSut()
    const decryptSpy = jest.spyOn(decrypterStub, 'decrypt')
    await sut.loadByToken('any_token')
    expect(decryptSpy).toHaveBeenCalledWith('any_token')
  })

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
