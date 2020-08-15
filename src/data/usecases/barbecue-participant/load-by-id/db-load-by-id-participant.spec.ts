import { DbLoadParticipantById } from './db-load-by-id-participant'
import { mockLoadParticipantByIdRepository } from '@/data/test'
import { LoadParticipantsByIdRepository } from '@/data/protocols/db'
import { throwError, mockParticipantModel } from '@/domain/test'

type SutTypes = {
  sut: DbLoadParticipantById
  loadParticipantsByIdRepositoryStub: LoadParticipantsByIdRepository
}

const makeSut = (): SutTypes => {
  const loadParticipantsByIdRepositoryStub = mockLoadParticipantByIdRepository()
  const sut = new DbLoadParticipantById(loadParticipantsByIdRepositoryStub)
  return {
    sut,
    loadParticipantsByIdRepositoryStub
  }
}

describe('LoadParticipantById use case', () => {
  test('Should call LoadParticipantsByIdRepository with correct values', async () => {
    const { sut, loadParticipantsByIdRepositoryStub } = makeSut()
    const loadSpy = jest.spyOn(loadParticipantsByIdRepositoryStub, 'loadById')
    await sut.loadById('any_participant_id')
    expect(loadSpy).toHaveBeenCalledWith('any_participant_id')
  })

  test('Should throws if LoadParticipantsByIdRepository throws', async () => {
    const { sut, loadParticipantsByIdRepositoryStub } = makeSut()
    jest.spyOn(loadParticipantsByIdRepositoryStub, 'loadById').mockImplementation(throwError)
    const participant = sut.loadById('any_participant_id')
    await expect(participant).rejects.toThrow()
  })

  test('Should a participant on success', async () => {
    const { sut } = makeSut()
    const participant = await sut.loadById('any_participant_id')
    expect(participant).toEqual(mockParticipantModel())
  })
})
