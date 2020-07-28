import { LoadParticipantsController } from './load-participant-controller'
import { HttpRequest } from '@/presentation/protocols/http'
import { mockLoadParticipants } from '@/presentation/test/mock-participant'
import { LoadParticipants } from '@/domain/usecases/barbecue-participant/load-participants'
import { throwError } from '@/domain/test'
import { serverError } from '@/presentation/helpers/http/http-helper'

type SutTypes = {
  sut: LoadParticipantsController
  loadParticipantsStub: LoadParticipants
}

const makeSut = (): SutTypes => {
  const loadParticipantsStub = mockLoadParticipants()
  const sut = new LoadParticipantsController(loadParticipantsStub)
  return {
    sut,
    loadParticipantsStub
  }
}

const mockRequest = (): HttpRequest => ({
  params: {
    barbecueId: 'any_barbecue_id'
  }
})

describe('LoadParticipant Controller', () => {
  test('should call LoadParticipants with correct barbecue id', async () => {
    const { sut, loadParticipantsStub } = makeSut()
    const loadSpy = jest.spyOn(loadParticipantsStub, 'load')
    await sut.handle(mockRequest())
    expect(loadSpy).toHaveBeenCalledWith(mockRequest().params.barbecueId)
  })

  test('should return 500 if LoadParticipants throws', async () => {
    const { sut, loadParticipantsStub } = makeSut()
    jest.spyOn(loadParticipantsStub, 'load').mockImplementation(throwError)
    const participants = await sut.handle(mockRequest())
    expect(participants).toEqual(serverError(new Error()))
  })
})
