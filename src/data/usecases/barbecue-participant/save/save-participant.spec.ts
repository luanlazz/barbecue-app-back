import { DbSaveParticipant } from './save-participant'
import { SaveParticipantRepository } from '@/data/protocols/db'
import { mockSaveParticipantRepository } from '@/data/test'
import { mockParticipantParams, throwError, mockParticipantModel } from '@/domain/test'

type SutTypes = {
  sut: DbSaveParticipant
  saveParticipantRepositoryStub: SaveParticipantRepository
}

const makeSut = (): SutTypes => {
  const saveParticipantRepositoryStub = mockSaveParticipantRepository()
  const sut = new DbSaveParticipant(saveParticipantRepositoryStub)
  return {
    sut,
    saveParticipantRepositoryStub
  }
}

describe('SaveParticipant use case', () => {
  test('Should call SaveParticipant with correct values', async () => {
    const { sut, saveParticipantRepositoryStub } = makeSut()
    const saveSpy = jest.spyOn(saveParticipantRepositoryStub, 'save')
    await sut.save(mockParticipantParams())
    expect(saveSpy).toHaveBeenCalledWith(mockParticipantParams())
  })

  test('Should throws if SaveParticipant throws', async () => {
    const { sut, saveParticipantRepositoryStub } = makeSut()
    jest.spyOn(saveParticipantRepositoryStub, 'save').mockImplementation(throwError)
    const result = sut.save(mockParticipantParams())
    await expect(result).rejects.toThrow()
  })

  test('Should return a participant on success', async () => {
    const { sut } = makeSut()
    const result = await sut.save(mockParticipantParams())
    expect(result).toEqual(mockParticipantModel())
  })
})
