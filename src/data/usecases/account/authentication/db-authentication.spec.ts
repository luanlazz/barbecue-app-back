import { DbAuthentication } from './db-authentication'
import { LoadAccountByEmailRepository } from '@/data/protocols/db/account/load-account-by-email-repository'
import { HasherCompare } from '@/data/protocols/cryptography/hasher-compare'
import { UpdateAccessTokenRepository } from '@/data/protocols/db/account/update-access-token-repository'
import { Encrypter } from '@/data/protocols/cryptography/encrypter'
import { mockLoadAccountByEmailRepository, mockHasherCompare, mockEncrypter, mockUpdateAccessTokenRepository } from '@/data/test'
import { mockAuthParams, throwError, mockAuthenticationModel } from '@/domain/test'

type SutTypes = {
  sut: DbAuthentication
  loadAccountByEmailStub: LoadAccountByEmailRepository
  hasherCompareStub: HasherCompare
  encrypterStub: Encrypter
  updateAccessTokenRepositoryStub: UpdateAccessTokenRepository
}

const makeSut = (): SutTypes => {
  const loadAccountByEmailStub = mockLoadAccountByEmailRepository()
  const hasherCompareStub = mockHasherCompare()
  const encrypterStub = mockEncrypter()
  const updateAccessTokenRepositoryStub = mockUpdateAccessTokenRepository()
  const sut = new DbAuthentication(loadAccountByEmailStub, hasherCompareStub, encrypterStub, updateAccessTokenRepositoryStub)
  return {
    sut,
    loadAccountByEmailStub,
    hasherCompareStub,
    encrypterStub,
    updateAccessTokenRepositoryStub
  }
}

describe('Authentication use case', () => {
  test('Should call LoadAccountByEmailRepository with correct email', async () => {
    const { sut, loadAccountByEmailStub } = makeSut()
    const loadByEmailSpy = jest.spyOn(loadAccountByEmailStub, 'loadByEmail')
    await sut.auth(mockAuthParams())
    expect(loadByEmailSpy).toHaveBeenCalledWith('any_email@mail.com')
  })

  test('Should throw if LoadAccountByEmailRepository throws', async () => {
    const { sut, loadAccountByEmailStub } = makeSut()
    jest.spyOn(loadAccountByEmailStub, 'loadByEmail').mockImplementation(throwError)
    const promise = sut.auth(mockAuthParams())
    await expect(promise).rejects.toThrow()
  })

  test('Should return null if LoadAccountByEmailRepository return null', async () => {
    const { sut, loadAccountByEmailStub } = makeSut()
    jest.spyOn(loadAccountByEmailStub, 'loadByEmail').mockReturnValueOnce(null)
    const accessToken = await sut.auth(mockAuthParams())
    expect(accessToken).toBeNull()
  })

  test('Should call HasherCompare with correct values', async () => {
    const { sut, hasherCompareStub } = makeSut()
    const compareSpy = jest.spyOn(hasherCompareStub, 'compare')
    await sut.auth(mockAuthParams())
    expect(compareSpy).toHaveBeenCalledWith('any_password', 'any_password')
  })

  test('Should throw if HasherCompare throws', async () => {
    const { sut, hasherCompareStub } = makeSut()
    jest.spyOn(hasherCompareStub, 'compare').mockImplementation(throwError)
    const promise = sut.auth(mockAuthParams())
    await expect(promise).rejects.toThrow()
  })

  test('Should return null if HasherCompare return false', async () => {
    const { sut, hasherCompareStub } = makeSut()
    jest.spyOn(hasherCompareStub, 'compare').mockResolvedValueOnce(false)
    const accessToken = await sut.auth(mockAuthParams())
    expect(accessToken).toBeNull()
  })

  test('Should call Encrypter with correct id', async () => {
    const { sut, encrypterStub } = makeSut()
    const encryptSpy = jest.spyOn(encrypterStub, 'encrypt')
    await sut.auth(mockAuthParams())
    expect(encryptSpy).toHaveBeenCalledWith('any_id')
  })

  test('Should throw if Encrypter throws', async () => {
    const { sut, encrypterStub } = makeSut()
    jest.spyOn(encrypterStub, 'encrypt').mockImplementation(throwError)
    const promise = sut.auth(mockAuthParams())
    await expect(promise).rejects.toThrow()
  })

  test('Should call UpdateAccessTokenRepository with correct values', async () => {
    const { sut, updateAccessTokenRepositoryStub } = makeSut()
    const updateAccessTokenSpy = jest.spyOn(updateAccessTokenRepositoryStub, 'updateAccessToken')
    await sut.auth(mockAuthParams())
    expect(updateAccessTokenSpy).toHaveBeenCalledWith('any_id', 'encrypt_token')
  })

  test('Should throw if UpdateAccessTokenRepository throws', async () => {
    const { sut, updateAccessTokenRepositoryStub } = makeSut()
    jest.spyOn(updateAccessTokenRepositoryStub, 'updateAccessToken').mockImplementation(throwError)
    const promise = sut.auth(mockAuthParams())
    await expect(promise).rejects.toThrow()
  })

  test('Should return account with access token on success', async () => {
    const { sut } = makeSut()
    const accessToken = await sut.auth(mockAuthParams())
    expect(accessToken).toBeTruthy()
    expect(accessToken).toEqual(mockAuthenticationModel())
  })
})
