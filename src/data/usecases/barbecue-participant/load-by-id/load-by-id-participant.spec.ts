import { DbLoadParticipantById } from './load-by-id-participant'
import { mockLoadParticipantByIdRepository } from '@/data/test'
import { LoadParticipantsByIdRepository } from '@/data/protocols/db/barbecue-participant/db-load-participants-by-id'

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
})
