import { SaveParticipantController } from './save-participant-controller'
import { HttpRequest } from '@/presentation/protocols/http'
import { Validation } from '@/presentation/protocols/validation'
import { mockValidation } from '@/presentation/test'
import { badRequest, serverError, ok } from '@/presentation/helpers/http/http-helper'
import { mockSaveParticipant } from '@/presentation/test/mock-participant'
import { SaveParticipant } from '@/domain/usecases/barbecue-participant/save-barbecue-participant'
import { throwError, mockParticipantModel } from '@/domain/test'

type SutTypes = {
  sut: SaveParticipantController
  validationStub: Validation
  saveParticipantStub: SaveParticipant
}

const makeSut = (): SutTypes => {
  const validationStub = mockValidation()
  const saveParticipantStub = mockSaveParticipant()
  const sut = new SaveParticipantController(validationStub, saveParticipantStub)
  return {
    sut,
    validationStub,
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

  test('should return throws if SaveParticipant throws', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockImplementation(throwError)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('should return participants on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(ok([mockParticipantModel()]))
  })
})
