import { NumberValidation } from './number-validation'
import { NumberValidator } from '@/validation/protocols/number-validation'
import { mockNumberValidator } from '@/validation/test'
import { InvalidParamError } from '@/presentation/errors'
import faker from 'faker'

type SutTypes = {
  numberValidator: NumberValidator
  sut: NumberValidation
}

const makeSut = (field = faker.database.column()): SutTypes => {
  const numberValidator = mockNumberValidator()
  const sut = new NumberValidation(numberValidator, field)
  return {
    numberValidator,
    sut
  }
}

describe('Number Validation', () => {
  test('Should calls NumberValidator with correct value', () => {
    const field = faker.database.column()
    const { sut, numberValidator } = makeSut(field)
    const validationSpy = jest.spyOn(numberValidator, 'isValid')
    const value = faker.random.number()
    sut.validate({ [field]: value })
    expect(validationSpy).toHaveBeenCalledWith(value)
  })

  test('Should return a InvalidParamError if validation fails', () => {
    const field = faker.database.column()
    const { sut, numberValidator } = makeSut(field)
    jest.spyOn(numberValidator, 'isValid').mockReturnValueOnce(false)
    const error = sut.validate({ value: faker.random.number() })
    expect(error).toEqual(new InvalidParamError(field))
  })

  test('Should not return if validation success', () => {
    const { sut } = makeSut()
    const error = sut.validate({ value: faker.random.number() })
    expect(error).toBeFalsy()
  })
})
