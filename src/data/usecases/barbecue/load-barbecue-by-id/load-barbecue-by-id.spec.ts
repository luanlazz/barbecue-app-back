import { DbLoadBarbecueById } from './load-barbecue-by-id'
import { mockLoadBarbecueByIdRepository } from '@/data/test'
import { LoadBarbecueByIdRepository } from '@/data/protocols/db/barbecue/load-barbecue-by-id-repository'

type SutTypes = {
  sut: DbLoadBarbecueById
  loadBarbecueByIdRepositoryStub: LoadBarbecueByIdRepository
}

const makeSut = (): SutTypes => {
  const loadBarbecueByIdRepositoryStub = mockLoadBarbecueByIdRepository()
  const sut = new DbLoadBarbecueById(loadBarbecueByIdRepositoryStub)
  return {
    sut,
    loadBarbecueByIdRepositoryStub
  }
}

describe('LoadBarbecueById use case', () => {
  test('Should call LoadBarbecueById with correct values', async () => {
    const { sut, loadBarbecueByIdRepositoryStub } = makeSut()
    const hashSpy = jest.spyOn(loadBarbecueByIdRepositoryStub, 'loadById')
    await sut.loadById('any_account_id')
    expect(hashSpy).toHaveBeenCalledWith('any_account_id')
  })
})
