import { DbAddAccount } from './db-add-account'
import { mockAddAccountRepository, mockHasher, mockLoadAccountByEmailRepository } from '@/data/test'
import { Hasher } from '@/data/protocols/cryptography/hasher'
import { DbAddAccountRepository } from '@/data/protocols/db/account/db-add-account-repository'
import { DbLoadAccountByEmailRepository } from '@/data/protocols/db/account/db-load-account-by-email-repository'
import { throwError, mockAccountModel, mockAddAccountParams } from '@/domain/test'

type SutTypes = {
  sut: DbAddAccount
  hasherStub: Hasher
  dbAddAccountRepositoryStub: DbAddAccountRepository
  dbLoadAccountByEmailRepositoryStub: DbLoadAccountByEmailRepository
}

const makeSut = (): SutTypes => {
  const hasherStub = mockHasher()
  const dbAddAccountRepositoryStub = mockAddAccountRepository()
  const dbLoadAccountByEmailRepositoryStub = mockLoadAccountByEmailRepository()
  const sut = new DbAddAccount(hasherStub, dbAddAccountRepositoryStub, dbLoadAccountByEmailRepositoryStub)
  return {
    sut,
    hasherStub,
    dbAddAccountRepositoryStub,
    dbLoadAccountByEmailRepositoryStub
  }
}

describe('DbAddAccount use case', () => {
  test('Should call Hasher with correct value', async () => {
    const { sut, hasherStub } = makeSut()
    const hashSpy = jest.spyOn(hasherStub, 'hash')
    await sut.add(mockAddAccountParams())
    expect(hashSpy).toHaveBeenCalledWith('any_password')
  })

  test('Should throw if Hasher throws', async () => {
    const { sut, hasherStub } = makeSut()
    jest.spyOn(hasherStub, 'hash').mockImplementation(throwError)
    const promise = sut.add(mockAddAccountParams())
    await expect(promise).rejects.toThrow()
  })

  test('Should call DbAddAccountRepository with correct value', async () => {
    const { sut, dbAddAccountRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(dbAddAccountRepositoryStub, 'add')
    await sut.add(mockAddAccountParams())
    expect(addSpy).toHaveBeenCalledWith({
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'hashed_password'
    })
  })

  test('Should throw if DbAddAccountRepository throws', async () => {
    const { sut, dbAddAccountRepositoryStub } = makeSut()
    jest.spyOn(dbAddAccountRepositoryStub, 'add').mockImplementation(throwError)
    const promise = sut.add(mockAddAccountParams())
    await expect(promise).rejects.toThrow()
  })

  test('Should call DbLoadAccountByEmailRepository with correct email', async () => {
    const { sut, dbLoadAccountByEmailRepositoryStub } = makeSut()
    const loadSpy = jest.spyOn(dbLoadAccountByEmailRepositoryStub, 'loadByEmail')
    await sut.add(mockAddAccountParams())
    expect(loadSpy).toHaveBeenCalledWith('any_email@mail.com')
  })

  test('Should throw if DbLoadAccountByEmailRepository throws', async () => {
    const { sut, dbLoadAccountByEmailRepositoryStub } = makeSut()
    jest.spyOn(dbLoadAccountByEmailRepositoryStub, 'loadByEmail').mockImplementation(throwError)
    const promise = sut.add(mockAddAccountParams())
    await expect(promise).rejects.toThrow()
  })

  test('Should return null if DbLoadAccountByEmailRepository find any account with email', async () => {
    const { sut, dbLoadAccountByEmailRepositoryStub } = makeSut()
    jest.spyOn(dbLoadAccountByEmailRepositoryStub, 'loadByEmail').mockReturnValueOnce(Promise.resolve(mockAccountModel()))
    const account = await sut.add(mockAddAccountParams())
    expect(account).toBeNull()
  })

  test('Should return an account on success', async () => {
    const { sut } = makeSut()
    const account = await sut.add(mockAddAccountParams())
    expect(account).toEqual(mockAccountModel())
  })
})
