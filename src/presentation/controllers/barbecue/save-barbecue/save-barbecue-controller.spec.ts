import { SaveBarbecueController } from './save-barbecue-controller'
import { HttpRequest } from '@/presentation/protocols/http'
import { Validation } from '@/presentation/protocols/validation'
import { mockValidation, mockSaveBarbecue } from '@/presentation/test'
import { badRequest } from '@/presentation/helpers/http/http-helper'
import { SaveBarbecue } from '@/domain/usecases/barbecue/save-barbecue'

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
  body: {
    date: 'any_date',
    description: 'any_description',
    observation: 'any_observation',
    valueTotalDrink: 0,
    valueTotalFood: 0
  }
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
    expect(saveSpy).toHaveBeenCalledWith(mockRequest().body)
  })
})
