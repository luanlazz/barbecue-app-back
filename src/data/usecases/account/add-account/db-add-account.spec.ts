import { DbAddAccount } from './db-add-account'
import { AddAccountParams } from '@/domain/usecases/account/add-account'
import { Hasher } from '@/data/protocols/cryptography/hasher'
import { DbAddAccountRepository } from '@/data/protocols/db/account/db-add-account-repository'
import { throwError } from '@/domain/test'
import { AccountModel } from '@/domain/models/account'

const mockHasher = (): Hasher => {
  class HasherStub implements Hasher {
    async hash (value: string): Promise<string> {
      return Promise.resolve('hashed_password')
    }
  }
  return new HasherStub()
}

const mockAddAccountRepository = (): DbAddAccountRepository => {
  class DbAddAccountRepositoryStub implements DbAddAccountRepository {
    async add (accountData: AddAccountParams): Promise<AccountModel> {
      return Promise.resolve(mockAccountModel())
    }
  }
  return new DbAddAccountRepositoryStub()
}

type SutTypes = {
  sut: DbAddAccount
  hasherStub: Hasher
  dbAddAccountRepositoryStub: DbAddAccountRepository
}

const makeSut = (): SutTypes => {
  const hasherStub = mockHasher()
  const dbAddAccountRepositoryStub = mockAddAccountRepository()
  const sut = new DbAddAccount(hasherStub, dbAddAccountRepositoryStub)
  return {
    sut,
    hasherStub,
    dbAddAccountRepositoryStub
  }
}

const mockAccountModel = (): AccountModel => ({
  id: 'any_id',
  name: 'any_name',
  email: 'any_email@mail.com',
  password: 'hashed_password'
})

const mockAddAccountParams = (): AddAccountParams => ({
  name: 'any_name',
  email: 'any_email@mail.com',
  password: 'any_password'
})

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
    const hashSpy = jest.spyOn(dbAddAccountRepositoryStub, 'add')
    await sut.add(mockAddAccountParams())
    expect(hashSpy).toHaveBeenCalledWith({
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'hashed_password'
    })
  })
})
