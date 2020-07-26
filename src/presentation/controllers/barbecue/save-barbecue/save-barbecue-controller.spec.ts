import { SaveBarbecueController } from './save-barbecue-controller'
import { HttpRequest } from '@/presentation/protocols/http'
import { Validation } from '@/presentation/protocols/validation'
import { mockValidation } from '@/presentation/test'

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
})
