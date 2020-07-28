import { SaveParticipantController } from './save-participant-controller'
import { HttpRequest } from '@/presentation/protocols/http'
import { Validation } from '@/presentation/protocols/validation'
import { mockValidation } from '@/presentation/test'
import { badRequest, serverError, ok } from '@/presentation/helpers/http/http-helper'
import { mockSaveParticipant, mockLoadParticipants } from '@/presentation/test/mock-participant'
import { SaveParticipant } from '@/domain/usecases/barbecue-participant/save-participant'
import { throwError, mockParticipantsModel } from '@/domain/test'
import { LoadParticipants } from '@/domain/usecases/barbecue-participant/load-participants'

type SutTypes = {
  sut: SaveParticipantController
  validationStub: Validation
  saveParticipantStub: SaveParticipant
  loadParticipantsStub: LoadParticipants
}

const makeSut = (): SutTypes => {
  const validationStub = mockValidation()
  const saveParticipantStub = mockSaveParticipant()
  const loadParticipantsStub = mockLoadParticipants()
  const sut = new SaveParticipantController(validationStub, saveParticipantStub, loadParticipantsStub)
  return {
    sut,
    validationStub,
    saveParticipantStub,
    loadParticipantsStub
  }
}

const mockRequest = (): HttpRequest => ({
  params: {
    barbecueId: 'any_barbecue_id',
    participantId: 'any_participant_id'
  },
  body: {
    name: 'any_name',
    food: true,
    drink: true,
    pay: false
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

  test('should throws if SaveParticipant throws', async () => {
    const { sut, saveParticipantStub } = makeSut()
    jest.spyOn(saveParticipantStub, 'save').mockImplementation(throwError)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('should call LoadParticipants with correct values', async () => {
    const { sut, loadParticipantsStub } = makeSut()
    const loadSpy = jest.spyOn(loadParticipantsStub, 'load')
    await sut.handle(mockRequest())
    expect(loadSpy).toHaveBeenCalledWith(mockRequest().params.barbecueId)
  })

  test('should throws if LoadParticipants throws', async () => {
    const { sut, loadParticipantsStub } = makeSut()
    jest.spyOn(loadParticipantsStub, 'load').mockImplementation(throwError)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('should return participants on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(ok(mockParticipantsModel()))
  })
})
