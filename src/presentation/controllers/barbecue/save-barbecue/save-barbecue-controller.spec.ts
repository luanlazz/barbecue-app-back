import { SaveBarbecueController } from './save-barbecue-controller'
import { HttpRequest } from '@/presentation/protocols/http'
import { Validation } from '@/presentation/protocols/validation'
import { mockValidation } from '@/presentation/test'
import { badRequest } from '@/presentation/helpers/http/http-helper'

type SutTypes = {
  sut: SaveBarbecueController
  validationStub: Validation
}

const makeSut = (): SutTypes => {
  const validationStub = mockValidation()
  const sut = new SaveBarbecueController(validationStub)
  return {
    sut,
    validationStub
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
})
