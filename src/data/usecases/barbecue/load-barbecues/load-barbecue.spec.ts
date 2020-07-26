import { DbLoadBarbecues } from './load-barbecue'
import { mockLoadBarbecuesRepository } from '@/data/test'
import { LoadBarbecuesRepository } from '@/data/protocols/db/barbecue/load-barbecue-repository'
import { throwError, mockBarbecueList } from '@/domain/test'

type SutTypes = {
  sut: DbLoadBarbecues
  loadBarbecuesRepositoryStub: LoadBarbecuesRepository
}

const makeSut = (): SutTypes => {
  const loadBarbecuesRepositoryStub = mockLoadBarbecuesRepository()
  const sut = new DbLoadBarbecues(loadBarbecuesRepositoryStub)
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

  test('Should a list of barbecues on success', async () => {
    const { sut } = makeSut()
    const barbecues = await sut.load('any_account_id')
    expect(barbecues).toEqual(mockBarbecueList())
  })
})
