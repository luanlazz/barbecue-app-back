import { DbLoadParticipants } from './load-participants'
import { mockLoadParticipantByBqRepository, mockLoadBarbecueByIdRepository } from '@/data/test'
import { LoadParticipantsByBqRepository } from '@/data/protocols/db/barbecue-participant/db-load-participants-by-bq'
import { mockParticipantsModel } from '@/domain/test/mock-participant'
import { throwError } from '@/domain/test'
import { LoadBarbecueByIdRepository } from '@/data/protocols/db/barbecue/load-barbecue-by-id-repository'

type SutTypes = {
  sut: DbLoadParticipants
  loadParticipantsByBqRepositoryStub: LoadParticipantsByBqRepository
  loadBarbecueByIdRepositoryStub: LoadBarbecueByIdRepository
}

const makeSut = (): SutTypes => {
  const loadParticipantsByBqRepositoryStub = mockLoadParticipantByBqRepository()
  const loadBarbecueByIdRepositoryStub = mockLoadBarbecueByIdRepository()
  const sut = new DbLoadParticipants(loadParticipantsByBqRepositoryStub, loadBarbecueByIdRepositoryStub)
  return {
    sut,
    loadParticipantsByBqRepositoryStub,
    loadBarbecueByIdRepositoryStub
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

  test('Should call LoadBarbecueByIdRepository with correct values', async () => {
    const { sut, loadBarbecueByIdRepositoryStub } = makeSut()
    const loadByIdSpy = jest.spyOn(loadBarbecueByIdRepositoryStub, 'loadById')
    await sut.load('any_barbecue_id')
    expect(loadByIdSpy).toHaveBeenCalledWith('any_barbecue_id')
  })

  test('Should a list of participants on success', async () => {
    const { sut } = makeSut()
    const participants = await sut.load('any_barbecue_id')
    expect(participants).toEqual(mockParticipantsModel())
  })
})
