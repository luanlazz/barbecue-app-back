import { NumberValidatorAdapter } from './number-validator-adapter'
import validator from 'validator'
import faker from 'faker'

jest.mock('validator', () => ({
  isNumeric (): Boolean {
    return true
  }
}))

const makeSut = (): NumberValidatorAdapter => {
  return new NumberValidatorAdapter()
}

describe('NumberValidatorAdapter adapter', () => {
  test('Should calls validator with correct email', () => {
    const sut = makeSut()
    const isNumericSpy = jest.spyOn(validator, 'isNumeric')
    const value = faker.random.number({ min: 0 }).toString()
    sut.isValid(value)
    expect(isNumericSpy).toHaveBeenCalledWith(value)
  })
})
