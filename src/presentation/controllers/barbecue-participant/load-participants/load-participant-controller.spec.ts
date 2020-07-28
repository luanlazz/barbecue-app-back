import { LoadParticipantsController } from './load-participant-controller'
import { HttpRequest } from '@/presentation/protocols/http'
import { mockLoadParticipants } from '@/presentation/test/mock-participant'
import { LoadParticipants } from '@/domain/usecases/barbecue-participant/load-participants'

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
})
