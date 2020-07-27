import { DbLoadParticipants } from './load-participants'
import { mockLoadParticipantByBqRepository } from '@/data/test'
import { LoadParticipantsByBqRepository } from '@/data/protocols/db/barbecue-participant/db-load-participants-by-bq'

type SutTypes = {
  sut: DbLoadParticipants
  loadParticipantsByBqRepositoryStub: LoadParticipantsByBqRepository
}

const makeSut = (): SutTypes => {
  const loadParticipantsByBqRepositoryStub = mockLoadParticipantByBqRepository()
  const sut = new DbLoadParticipants(loadParticipantsByBqRepositoryStub)
  return {
    sut,
    loadParticipantsByBqRepositoryStub
  }
}

describe('LoadParticipants use case', () => {
  test('Should call LoadParticipantsByBqRepository with correct values', async () => {
    const { sut, loadParticipantsByBqRepositoryStub } = makeSut()
    const hashSpy = jest.spyOn(loadParticipantsByBqRepositoryStub, 'load')
    await sut.load('any_barbecue_id')
    expect(hashSpy).toHaveBeenCalledWith('any_barbecue_id')
  })
})
