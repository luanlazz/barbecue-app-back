import { NumberValidation } from './number-validation'
import { NumberValidator } from '@/validation/protocols/number-validation'
import { mockNumberValidator } from '@/validation/test'
import { InvalidParamError } from '@/presentation/errors'
import faker from 'faker'

type SutTypes = {
  numberValidator: NumberValidator
  sut: NumberValidation
}

const makeSut = (): SutTypes => {
  const numberValidator = mockNumberValidator()
  const sut = new NumberValidation(numberValidator, 'field')
  return {
    numberValidator,
    sut
  }
}

describe('Number Validation', () => {
  test('Should return a InvalidParamError if validation fails', () => {
    const { sut, numberValidator } = makeSut()
    jest.spyOn(numberValidator, 'isValid').mockReturnValueOnce(false)
    const error = sut.validate({ value: faker.random.number({ min: -100, max: 0 }) })
    expect(error).toEqual(new InvalidParamError('field'))
  })

  test('Should not return if validation success', () => {
    const { sut } = makeSut()
    const error = sut.validate({ value: faker.random.number({ min: 0 }) })
    expect(error).toBeFalsy()
  })
})
