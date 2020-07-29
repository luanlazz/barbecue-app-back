import { SaveBarbecueController } from './save-barbecue-controller'
import { HttpRequest } from '@/presentation/protocols/http'
import { Validation } from '@/presentation/protocols/validation'
import { mockValidation, mockSaveBarbecue } from '@/presentation/test'
import { badRequest, serverError, ok } from '@/presentation/helpers/http/http-helper'
import { SaveBarbecue } from '@/domain/usecases/barbecue/save-barbecue'
import { throwError, mockBarbecueModel } from '@/domain/test'

type SutTypes = {
  sut: SaveBarbecueController
  validationStub: Validation
  saveBarbecueStub: SaveBarbecue
}

const makeSut = (): SutTypes => {
  const validationStub = mockValidation()
  const saveBarbecueStub = mockSaveBarbecue()
  const sut = new SaveBarbecueController(validationStub, saveBarbecueStub)
  return {
    sut,
    validationStub,
    saveBarbecueStub
  }
}

const mockRequest = (): HttpRequest => ({
  params: {
    barbecueId: 'any_barbecue_id'
  },
  body: {
    date: 'any_date',
    description: 'any_description',
    observation: 'any_observation',
    numParticipants: 0,
    valueTotalDrink: 0,
    valueTotalFood: 0,
    valueCollected: 0
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

  test('should return 400 if Validation return an error', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new Error())
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(badRequest(new Error()))
  })

  test('should call SaveBarbecue with correct values', async () => {
    const { sut, saveBarbecueStub } = makeSut()
    const saveSpy = jest.spyOn(saveBarbecueStub, 'save')
    await sut.handle(mockRequest())
    expect(saveSpy).toHaveBeenCalledWith({
      barbecueId: 'any_barbecue_id',
      accountId: 'any_account_id',
      ...mockRequest().body
    })
  })

  test('should throw if SaveBarbecue throws', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockImplementation(throwError)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return a barbecue on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(ok(mockBarbecueModel()))
  })
})
