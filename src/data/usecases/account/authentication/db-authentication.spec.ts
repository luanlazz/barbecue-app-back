import { DbAuthentication } from './db-authentication'
import { LoadAccountByEmailRepository } from '@/data/protocols/db/account/load-account-by-email-repository'
import { HasherComparer } from '@/data/protocols/cryptography/hasher-comparer'
import { Encrypter } from '@/data/protocols/cryptography/encrypter'
import { mockLoadAccountByEmailRepository, mockHasherComparer, mockEncrypter } from '@/data/test'
import { mockAuthParams, throwError } from '@/domain/test'

type SutTypes = {
  sut: DbAuthentication
  loadAccountByEmailStub: LoadAccountByEmailRepository
  hasherComparerStub: HasherComparer
  encrypterStub: Encrypter
}

const makeSut = (): SutTypes => {
  const loadAccountByEmailStub = mockLoadAccountByEmailRepository()
  const hasherComparerStub = mockHasherComparer()
  const encrypterStub = mockEncrypter()
  const sut = new DbAuthentication(loadAccountByEmailStub, hasherComparerStub, encrypterStub)
  return {
    sut,
    loadAccountByEmailStub,
    hasherComparerStub,
    encrypterStub
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

  test('Should call HasherComparer with correct values', async () => {
    const { sut, hasherComparerStub } = makeSut()
    const comparerSpy = jest.spyOn(hasherComparerStub, 'comparer')
    await sut.auth(mockAuthParams())
    expect(comparerSpy).toHaveBeenCalledWith('any_password', 'any_password')
  })

  test('Should throw if HasherComparer throws', async () => {
    const { sut, hasherComparerStub } = makeSut()
    jest.spyOn(hasherComparerStub, 'comparer').mockImplementation(throwError)
    const promise = sut.auth(mockAuthParams())
    await expect(promise).rejects.toThrow()
  })

  test('Should return null if HasherComparer return false', async () => {
    const { sut, hasherComparerStub } = makeSut()
    jest.spyOn(hasherComparerStub, 'comparer').mockResolvedValueOnce(false)
    const accessToken = await sut.auth(mockAuthParams())
    expect(accessToken).toBeNull()
  })

  test('Should call Encrypter with correct id', async () => {
    const { sut, encrypterStub } = makeSut()
    const encryptSpy = jest.spyOn(encrypterStub, 'encrypt')
    await sut.auth(mockAuthParams())
    expect(encryptSpy).toHaveBeenCalledWith('any_id')
  })
})
