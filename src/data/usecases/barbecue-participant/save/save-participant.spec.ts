import { DbSaveParticipant } from './save-participant'
import { SaveParticipantRepository } from '@/data/protocols/db/barbecue-participant/db-save-participant'
import { mockSaveParticipantRepository } from '@/data/test'
import { mockParticipantParams, throwError } from '@/domain/test'

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
    const participants = sut.save(mockParticipantParams())
    await expect(participants).rejects.toThrow()
  })
})
