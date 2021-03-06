import { DbSaveBarbecue } from './db-save-barbecue'
import { SaveBarbecueRepository } from '@/data/protocols/db'
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
    const saveSpy = jest.spyOn(saveBarbecueRepositoryStub, 'save')
    await sut.save(mockBarbecueParams())
    expect(saveSpy).toHaveBeenCalledWith(mockBarbecueParams())
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
