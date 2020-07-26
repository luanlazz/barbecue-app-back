import { DbSaveParticipant } from './save-barbecue-participant'
import { SaveParticipantRepository } from '@/data/protocols/db/barbecue-participant/db-save-participant'
import { mockSaveParticipantRepository } from '@/data/test'
import { mockParticipantParams } from '@/domain/test'

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
})
