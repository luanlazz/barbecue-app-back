import { DbLoadBarbecue } from './load-barbecue'
import { mockLoadBarbecuesRepository } from '@/data/test'
import { LoadBarbecuesRepository } from '@/data/protocols/db/barbecue/load-barbecue-repository'
import { throwError } from '@/domain/test'

type SutTypes = {
  sut: DbLoadBarbecue
  loadBarbecuesRepositoryStub: LoadBarbecuesRepository
}

const makeSut = (): SutTypes => {
  const loadBarbecuesRepositoryStub = mockLoadBarbecuesRepository()
  const sut = new DbLoadBarbecue(loadBarbecuesRepositoryStub)
  return {
    sut,
    loadBarbecuesRepositoryStub
  }
}

describe('LoadBarbecue use case', () => {
  test('Should call LoadBarbecue with correct values', async () => {
    const { sut, loadBarbecuesRepositoryStub } = makeSut()
    const hashSpy = jest.spyOn(loadBarbecuesRepositoryStub, 'loadAll')
    await sut.load('any_account_id')
    expect(hashSpy).toHaveBeenCalledWith('any_account_id')
  })

  test('Should throws if LoadBarbecue throws', async () => {
    const { sut, loadBarbecuesRepositoryStub } = makeSut()
    jest.spyOn(loadBarbecuesRepositoryStub, 'loadAll').mockImplementation(throwError)
    const barbecue = sut.load('any_account_id')
    await expect(barbecue).rejects.toThrow()
  })
})
