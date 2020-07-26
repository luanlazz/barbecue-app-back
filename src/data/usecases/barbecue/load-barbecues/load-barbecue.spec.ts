import { DbLoadBarbecue } from './load-barbecue'
import { mockLoadBarbecuesRepository } from '@/data/test'
import { LoadBarbecuesRepository } from '@/data/protocols/db/barbecue/load-barbecue-repository'

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

describe('SaveBarbecue use case', () => {
  test('Should call SaveBarbecue with correct values', async () => {
    const { sut, loadBarbecuesRepositoryStub } = makeSut()
    const hashSpy = jest.spyOn(loadBarbecuesRepositoryStub, 'loadAll')
    await sut.load('any_account_id')
    expect(hashSpy).toHaveBeenCalledWith('any_account_id')
  })
})
