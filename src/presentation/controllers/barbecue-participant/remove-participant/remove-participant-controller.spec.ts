import { RemoveParticipantController } from './remove-participant-controller'
import { HttpRequest } from '@/presentation/protocols/http'
import { mockRemoveParticipant } from '@/presentation/test/mock-participant'
import { RemoveParticipant } from '@/domain/usecases/barbecue-participant/remove-participant'
import { throwError } from '@/domain/test'
import { serverError } from '@/presentation/helpers/http/http-helper'

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
    const removeSpy = jest.spyOn(removeParticipantStub, 'remove')
    await sut.handle(mockRequest())
    expect(removeSpy).toHaveBeenCalledWith(mockRequest().params.barbecueId, mockRequest().params.participantId)
  })

  test('should return 500 if RemoveParticipant throws', async () => {
    const { sut, removeParticipantStub } = makeSut()
    jest.spyOn(removeParticipantStub, 'remove').mockImplementation(throwError)
    const participants = await sut.handle(mockRequest())
    expect(participants).toEqual(serverError(new Error()))
  })
})
