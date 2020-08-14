import { SaveParticipantController } from './save-participant-controller'
import { HttpRequest } from '@/presentation/protocols/http'
import { Validation } from '@/presentation/protocols/validation'
import { mockValidation, mockLoadBarbecueById } from '@/presentation/test'
import { badRequest, serverError, forbidden, ok } from '@/presentation/helpers/http/http-helper'
import { mockSaveParticipant } from '@/presentation/test/mock-participant'
import { SaveParticipant } from '@/domain/usecases/barbecue-participant/save-participant'
import { throwError, mockParticipantModel } from '@/domain/test'
import { LoadBarbecueById } from '@/domain/usecases/barbecue/load-barbecue-by-id'
import { InvalidParamError } from '@/presentation/errors'

type SutTypes = {
  sut: SaveParticipantController
  validationStub: Validation
  loadBarbecueByIdStub: LoadBarbecueById
  saveParticipantStub: SaveParticipant
}

const makeSut = (): SutTypes => {
  const validationStub = mockValidation()
  const loadBarbecueByIdStub = mockLoadBarbecueById()
  const saveParticipantStub = mockSaveParticipant()
  const sut = new SaveParticipantController(validationStub, loadBarbecueByIdStub, saveParticipantStub)
  return {
    sut,
    validationStub,
    loadBarbecueByIdStub,
    saveParticipantStub
  }
}

const mockRequest = (): HttpRequest => ({
  params: {
    barbecueId: 'any_barbecue_id',
    participantId: 'any_participant_id'
  },
  body: {
    name: 'any_name',
    pay: false,
    value: 10
  },
  accountId: 'any_account_id'
})

describe('SaveBarbecue Controller', () => {
  test('should call Validation with correct values', async () => {
    const { sut, validationStub } = makeSut()
    const validateSpy = jest.spyOn(validationStub, 'validate')
    await sut.handle(mockRequest())
    expect(validateSpy).toHaveBeenCalledWith(mockRequest().body)
  })

  test('should return 400 if Validation fails', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new Error())
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(badRequest(new Error()))
  })

  test('should call LoadBarbecueById with correct barbecue id', async () => {
    const { sut, loadBarbecueByIdStub } = makeSut()
    const loadSpy = jest.spyOn(loadBarbecueByIdStub, 'loadById')
    await sut.handle(mockRequest())
    expect(loadSpy).toHaveBeenCalledWith(mockRequest().params.barbecueId)
  })

  test('should return 500 if LoadBarbecueById throws', async () => {
    const { sut, loadBarbecueByIdStub } = makeSut()
    jest.spyOn(loadBarbecueByIdStub, 'loadById').mockImplementation(throwError)
    const error = await sut.handle(mockRequest())
    expect(error).toEqual(serverError(new Error()))
  })

  test('should return 403 if LoadBarbecueById not return a barbecue', async () => {
    const { sut, loadBarbecueByIdStub } = makeSut()
    jest.spyOn(loadBarbecueByIdStub, 'loadById').mockReturnValueOnce(null)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(forbidden(new InvalidParamError('barbecueId')))
  })

  test('should call SaveParticipant with correct values', async () => {
    const { sut, saveParticipantStub } = makeSut()
    const saveSpy = jest.spyOn(saveParticipantStub, 'save')
    await sut.handle(mockRequest())
    expect(saveSpy).toHaveBeenCalledWith({
      barbecueId: 'any_barbecue_id',
      participantId: 'any_participant_id',
      ...mockRequest().body
    })
  })

  test('should call SaveParticipant with id on body if no participantId on params', async () => {
    const { sut, saveParticipantStub } = makeSut()
    const saveSpy = jest.spyOn(saveParticipantStub, 'save')
    const request = mockRequest()
    delete request.params.participantId
    request.body.id = 'any_body_id'
    await sut.handle(request)
    expect(saveSpy).toHaveBeenCalledWith({
      barbecueId: 'any_barbecue_id',
      participantId: 'any_body_id',
      ...mockRequest().body
    })
  })

  test('should throws if SaveParticipant throws', async () => {
    const { sut, saveParticipantStub } = makeSut()
    jest.spyOn(saveParticipantStub, 'save').mockImplementation(throwError)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('should return 200 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(ok(mockParticipantModel()))
  })
})
