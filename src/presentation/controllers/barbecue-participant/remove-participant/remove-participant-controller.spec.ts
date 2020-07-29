import { RemoveParticipantController } from './remove-participant-controller'
import { HttpRequest } from '@/presentation/protocols/http'
import { mockRemoveParticipant } from '@/presentation/test/mock-participant'
import { RemoveParticipant } from '@/domain/usecases/barbecue-participant/remove-participant'

type SutTypes = {
  sut: RemoveParticipantController
  removeParticipantStub: RemoveParticipant
}

const makeSut = (): SutTypes => {
  const removeParticipantStub = mockRemoveParticipant()
  const sut = new RemoveParticipantController(removeParticipantStub)
  return {
    sut,
    removeParticipantStub
  }
}

const mockRequest = (): HttpRequest => ({
  params: {
    barbecueId: 'any_barbecue_id',
    participantId: 'any_participant_id'
  }
})

describe('RemoveParticipant Controller', () => {
  test('should call RemoveParticipant with correct values', async () => {
    const { sut, removeParticipantStub } = makeSut()
    const loadSpy = jest.spyOn(removeParticipantStub, 'remove')
    await sut.handle(mockRequest())
    expect(loadSpy).toHaveBeenCalledWith(mockRequest().params.barbecueId, mockRequest().params.participantId)
  })
})
