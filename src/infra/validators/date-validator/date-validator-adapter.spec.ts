import { DateValidatorAdapter } from './date-validator-adapter'

const makeSut = (): DateValidatorAdapter => {
  return new DateValidatorAdapter()
}

describe('DateValidatorAdapter adapter', () => {
  test('Should return false if format invalid', () => {
    const sut = makeSut()
    const result = sut.isValid('2020/02/01')
    expect(result).toBeFalsy()
  })
})
