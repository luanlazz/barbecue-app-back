import { RemoveParticipantController } from './remove-participant-controller'
import { HttpRequest } from '@/presentation/protocols/http'
import { mockRemoveParticipant } from '@/presentation/test/mock-participant'
import { serverError, noContent } from '@/presentation/helpers/http/http-helper'
import { mockLoadBarbecueById } from '@/presentation/test'
import { RemoveParticipant } from '@/domain/usecases/barbecue-participant/remove-participant'
import { LoadBarbecueById } from '@/domain/usecases/barbecue/load-barbecue-by-id'
import { throwError } from '@/domain/test'

type SutTypes = {
  sut: RemoveParticipantController
  loadBarbecueByIdStub: LoadBarbecueById
  removeParticipantStub: RemoveParticipant
}

const makeSut = (): SutTypes => {
  const loadBarbecueByIdStub = mockLoadBarbecueById()
  const removeParticipantStub = mockRemoveParticipant()
  const sut = new RemoveParticipantController(loadBarbecueByIdStub, removeParticipantStub)
  return {
    sut,
    loadBarbecueByIdStub,
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
  test('should call LoadBarbecueById with correct barbecue id', async () => {
    const { sut, loadBarbecueByIdStub } = makeSut()
    const loadSpy = jest.spyOn(loadBarbecueByIdStub, 'loadById')
    await sut.handle(mockRequest())
    expect(loadSpy).toHaveBeenCalledWith(mockRequest().params.barbecueId)
  })

  test('should call RemoveParticipant with correct values', async () => {
    const { sut, removeParticipantStub } = makeSut()
    const removeSpy = jest.spyOn(removeParticipantStub, 'remove')
    await sut.handle(mockRequest())
    expect(removeSpy).toHaveBeenCalledWith(mockRequest().params.barbecueId, mockRequest().params.participantId)
  })

  test('should return 500 if RemoveParticipant throws', async () => {
    const { sut, removeParticipantStub } = makeSut()
    jest.spyOn(removeParticipantStub, 'remove').mockImplementation(throwError)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('should return 204 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(noContent())
  })
})
