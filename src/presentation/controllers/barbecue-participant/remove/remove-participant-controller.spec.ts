import { RemoveParticipantController } from './remove-participant-controller'
import { HttpRequest } from '@/presentation/protocols'
import { mockRemoveParticipant, mockLoadParticipantById, mockLoadBarbecueById } from '@/presentation/test'
import { serverError, noContent, forbidden, serviceUnavailable } from '@/presentation/helpers'
import { InvalidParamError, UnexpectedError } from '@/presentation/errors'
import { LoadBarbecueById, LoadParticipantById, RemoveParticipant } from '@/domain/usecases'
import { throwError } from '@/domain/test'

type SutTypes = {
  sut: RemoveParticipantController
  loadBarbecueByIdStub: LoadBarbecueById
  loadParticipantByIdStub: LoadParticipantById
  removeParticipantStub: RemoveParticipant
}

const makeSut = (): SutTypes => {
  const loadBarbecueByIdStub = mockLoadBarbecueById()
  const loadParticipantByIdStub = mockLoadParticipantById()
  const removeParticipantStub = mockRemoveParticipant()
  const sut = new RemoveParticipantController(loadBarbecueByIdStub, loadParticipantByIdStub, removeParticipantStub)
  return {
    sut,
    loadBarbecueByIdStub,
    loadParticipantByIdStub,
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

  test('should return 500 if LoadBarbecueById throws', async () => {
    const { sut, loadBarbecueByIdStub } = makeSut()
    jest.spyOn(loadBarbecueByIdStub, 'loadById').mockImplementation(throwError)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('should return 403 if LoadBarbecueById not return a barbecue', async () => {
    const { sut, loadBarbecueByIdStub } = makeSut()
    jest.spyOn(loadBarbecueByIdStub, 'loadById').mockReturnValueOnce(null)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(forbidden(new InvalidParamError('barbecueId')))
  })

  test('should call LoadParticipantById with correct participant id', async () => {
    const { sut, loadParticipantByIdStub } = makeSut()
    const loadSpy = jest.spyOn(loadParticipantByIdStub, 'loadById')
    await sut.handle(mockRequest())
    expect(loadSpy).toHaveBeenCalledWith(mockRequest().params.participantId)
  })

  test('should return 500 if LoadParticipantById throws', async () => {
    const { sut, loadParticipantByIdStub } = makeSut()
    jest.spyOn(loadParticipantByIdStub, 'loadById').mockImplementation(throwError)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('should return 403 if LoadParticipantById not return a barbecue', async () => {
    const { sut, loadParticipantByIdStub } = makeSut()
    jest.spyOn(loadParticipantByIdStub, 'loadById').mockReturnValueOnce(null)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(forbidden(new InvalidParamError('participantId')))
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

  test('should return 503 if RemoveParticipant return false', async () => {
    const { sut, removeParticipantStub } = makeSut()
    jest.spyOn(removeParticipantStub, 'remove').mockReturnValueOnce(Promise.resolve(false))
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serviceUnavailable(new UnexpectedError('remove participant')))
  })

  test('should return 204 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(noContent())
  })
})
