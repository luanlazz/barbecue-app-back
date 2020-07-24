import { DbAuthentication } from './db-authentication'
import { LoadAccountByEmailRepository } from '@/data/protocols/db/account/load-account-by-email-repository'
import { mockLoadAccountByEmailRepository } from '@/data/test'
import { mockAuthParams } from '@/domain/test'

type SutTypes = {
  sut: DbAuthentication
  loadAccountByEmailStub: LoadAccountByEmailRepository
}

const makeSut = (): SutTypes => {
  const loadAccountByEmailStub = mockLoadAccountByEmailRepository()
  const sut = new DbAuthentication(loadAccountByEmailStub)
  return {
    sut,
    loadAccountByEmailStub
  }
}

describe('Authentication use case', () => {
  test('Should call LoadAccountByEmailRepository with correct email', async () => {
    const { sut, loadAccountByEmailStub } = makeSut()
    const loadByEmailSpy = jest.spyOn(loadAccountByEmailStub, 'loadByEmail')
    await sut.auth(mockAuthParams())
    expect(loadByEmailSpy).toHaveBeenCalledWith('any_email@mail.com')
  })
})
