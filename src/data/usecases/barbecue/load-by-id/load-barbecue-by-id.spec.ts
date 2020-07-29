import { DbLoadBarbecueById } from './load-barbecue-by-id'
import { mockLoadBarbecueByIdRepository } from '@/data/test'
import { LoadBarbecueByIdRepository } from '@/data/protocols/db/barbecue/load-barbecue-by-id-repository'
import { throwError, mockBarbecueModel } from '@/domain/test'

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
    await sut.loadById('any_barbecue_id')
    expect(hashSpy).toHaveBeenCalledWith('any_barbecue_id')
  })

  test('Should throws if LoadBarbecueById throws', async () => {
    const { sut, loadBarbecueByIdRepositoryStub } = makeSut()
    jest.spyOn(loadBarbecueByIdRepositoryStub, 'loadById').mockImplementation(throwError)
    const barbecue = sut.loadById('any_barbecue_id')
    await expect(barbecue).rejects.toThrow()
  })

  test('Should a barbecue on success', async () => {
    const { sut } = makeSut()
    const barbecue = await sut.loadById('any_barbecue_id')
    expect(barbecue).toEqual(mockBarbecueModel())
  })
})
