import { DbSaveBarbecue } from './save-barbecue'
import { SaveBarbecueRepository } from '@/data/protocols/db/barbecue/save-barbecue-repository'
import { mockSaveBarbecueRepository } from '@/data/test'
import { mockBarbecueParams, throwError, mockBarbecueModel } from '@/domain/test'

type SutTypes = {
  sut: DbSaveBarbecue
  saveBarbecueRepositoryStub: SaveBarbecueRepository
}

const makeSut = (): SutTypes => {
  const saveBarbecueRepositoryStub = mockSaveBarbecueRepository()
  const sut = new DbSaveBarbecue(saveBarbecueRepositoryStub)
  return {
    sut,
    saveBarbecueRepositoryStub
  }
}

describe('SaveBarbecue use case', () => {
  test('Should call SaveBarbecue with correct values', async () => {
    const { sut, saveBarbecueRepositoryStub } = makeSut()
    const hashSpy = jest.spyOn(saveBarbecueRepositoryStub, 'save')
    await sut.save(mockBarbecueParams())
    expect(hashSpy).toHaveBeenCalledWith(mockBarbecueParams())
  })

  test('Should throws if SaveBarbecue throws', async () => {
    const { sut, saveBarbecueRepositoryStub } = makeSut()
    jest.spyOn(saveBarbecueRepositoryStub, 'save').mockImplementation(throwError)
    const barbecue = sut.save(mockBarbecueParams())
    await expect(barbecue).rejects.toThrow()
  })

  test('Should return an barbecue on success', async () => {
    const { sut } = makeSut()
    const barbecue = await sut.save(mockBarbecueParams())
    expect(barbecue).toEqual(mockBarbecueModel())
  })
})
