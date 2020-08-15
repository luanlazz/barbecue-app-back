import { DbLoadParticipants } from './db-load-participants'
import { LoadParticipantsByBqRepository } from '@/data/protocols/db'
import { mockLoadParticipantByBqRepository } from '@/data/test'
import { throwError } from '@/domain/test'

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
    const loadSpy = jest.spyOn(loadParticipantsByBqRepositoryStub, 'load')
    await sut.load('any_barbecue_id')
    expect(loadSpy).toHaveBeenCalledWith('any_barbecue_id')
  })

  test('Should throws if LoadParticipantsByBqRepository throws', async () => {
    const { sut, loadParticipantsByBqRepositoryStub } = makeSut()
    jest.spyOn(loadParticipantsByBqRepositoryStub, 'load').mockImplementation(throwError)
    const participants = sut.load('any_barbecue_id')
    await expect(participants).rejects.toThrow()
  })

  test('Should a list of participants on success', async () => {
    const { sut } = makeSut()
    const participants = await sut.load('any_barbecue_id')
    expect(participants.length).toBeGreaterThan(0)
  })
})
