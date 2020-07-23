import { DbAddAccount } from './db-add-account'
import { AddAccountParams } from '@/domain/usecases/account/add-account'
import { Hasher } from '@/data/protocols/cryptography/hasher'

const mockHasher = (): Hasher => {
  class HasherStub implements Hasher {
    async hash (value: string): Promise<string> {
      return Promise.resolve('hashed_password')
    }
  }
  return new HasherStub()
}

type SutTypes = {
  sut: DbAddAccount
  hasherStub: Hasher
}

const makeSut = (): SutTypes => {
  const hasherStub = mockHasher()
  const sut = new DbAddAccount(hasherStub)
  return {
    sut,
    hasherStub
  }
}

const mockAddAccountParams = (): AddAccountParams => ({
  name: 'any_name',
  email: 'any_email',
  password: 'any_password'
})

describe('DbAddAccount use case', () => {
  test('Should call Hasher with correct value', async () => {
    const { sut, hasherStub } = makeSut()
    const hashSpy = jest.spyOn(hasherStub, 'hash')
    await sut.add(mockAddAccountParams())
    expect(hashSpy).toHaveBeenCalledWith('any_password')
  })
})
