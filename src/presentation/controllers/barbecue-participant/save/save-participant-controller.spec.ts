import { SaveParticipantController } from './save-participant-controller'
import { HttpRequest } from '@/presentation/protocols/http'
import { Validation } from '@/presentation/protocols/validation'
import { mockValidation, mockLoadBarbecueById } from '@/presentation/test'
import { badRequest, serverError, ok } from '@/presentation/helpers/http/http-helper'
import { mockSaveParticipant, mockCalculateContribution } from '@/presentation/test/mock-participant'
import { SaveParticipant } from '@/domain/usecases/barbecue-participant/save-participant'
import { throwError, mockParticipantsModel, mockBarbecueModel } from '@/domain/test'
import { LoadBarbecueById } from '@/domain/usecases/barbecue/load-barbecue-by-id'
import { CalculateContribution } from '@/domain/usecases/barbecue-participant/calculate-contribution'

type SutTypes = {
  sut: SaveParticipantController
  validationStub: Validation
  saveParticipantStub: SaveParticipant
  loadBarbecueByIdStub: LoadBarbecueById
  calculateContributionStub: CalculateContribution
}

const makeSut = (): SutTypes => {
  const validationStub = mockValidation()
  const saveParticipantStub = mockSaveParticipant()
  const loadBarbecueByIdStub = mockLoadBarbecueById()
  const calculateContributionStub = mockCalculateContribution()
  const sut = new SaveParticipantController(validationStub, saveParticipantStub, loadBarbecueByIdStub, calculateContributionStub)
  return {
    sut,
    validationStub,
    saveParticipantStub,
    loadBarbecueByIdStub,
    calculateContributionStub
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

  test('should call LoadBarbecueById with correct values', async () => {
    const { sut, loadBarbecueByIdStub } = makeSut()
    const loadByIdSpy = jest.spyOn(loadBarbecueByIdStub, 'loadById')
    await sut.handle(mockRequest())
    expect(loadByIdSpy).toHaveBeenCalledWith(mockRequest().params.barbecueId)
  })

  test('should throws if LoadBarbecueById throws', async () => {
    const { sut, loadBarbecueByIdStub } = makeSut()
    jest.spyOn(loadBarbecueByIdStub, 'loadById').mockImplementation(throwError)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('should call CalculateContribution with correct values', async () => {
    const { sut, calculateContributionStub } = makeSut()
    const calculateSpy = jest.spyOn(calculateContributionStub, 'calculate')
    await sut.handle(mockRequest())
    expect(calculateSpy).toHaveBeenCalledWith(mockBarbecueModel(), mockParticipantsModel())
  })

  test('should return participants on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(ok(mockParticipantsModel()))
  })
})
