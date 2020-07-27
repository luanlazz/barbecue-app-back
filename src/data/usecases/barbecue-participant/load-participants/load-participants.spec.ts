import { DbLoadParticipants } from './load-participants'
import { mockLoadParticipantByBqRepository } from '@/data/test'
import { LoadParticipantsByBqRepository } from '@/data/protocols/db/barbecue-participant/db-load-participants-by-bq'
import { mockParticipantsModel } from '@/domain/test/mock-participant'
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
    const hashSpy = jest.spyOn(loadParticipantsByBqRepositoryStub, 'load')
    await sut.load('any_barbecue_id')
    expect(hashSpy).toHaveBeenCalledWith('any_barbecue_id')
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
    expect(participants).toEqual(mockParticipantsModel())
  })
})
