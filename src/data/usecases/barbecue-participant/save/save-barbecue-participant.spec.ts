import { DbSaveParticipant } from './save-barbecue-participant'
import { SaveParticipantRepository } from '@/data/protocols/db/barbecue-participant/db-save-participant'
import { LoadParticipantsByBqRepository } from '@/data/protocols/db/barbecue-participant/db-load-participants-by-bq'
import { mockSaveParticipantRepository, mockLoadParticipantByBqRepository } from '@/data/test'
import { mockParticipantParams, throwError, mockParticipantModel } from '@/domain/test'

type SutTypes = {
  sut: DbSaveParticipant
  saveParticipantRepositoryStub: SaveParticipantRepository
  loadParticipantsByBqRepositoryStub: LoadParticipantsByBqRepository
}

const makeSut = (): SutTypes => {
  const saveParticipantRepositoryStub = mockSaveParticipantRepository()
  const loadParticipantsByBqRepositoryStub = mockLoadParticipantByBqRepository()
  const sut = new DbSaveParticipant(saveParticipantRepositoryStub, loadParticipantsByBqRepositoryStub)
  return {
    sut,
    saveParticipantRepositoryStub,
    loadParticipantsByBqRepositoryStub
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

  test('Should call LoadParticipantsByBqRepository with correct values', async () => {
    const { sut, loadParticipantsByBqRepositoryStub } = makeSut()
    const loadSpy = jest.spyOn(loadParticipantsByBqRepositoryStub, 'load')
    await sut.save(mockParticipantParams())
    expect(loadSpy).toHaveBeenCalledWith(mockParticipantParams().barbecueId)
  })

  test('Should return participants on success', async () => {
    const { sut } = makeSut()
    const participants = await sut.save(mockParticipantParams())
    expect(participants).toEqual([mockParticipantModel()])
  })
})
