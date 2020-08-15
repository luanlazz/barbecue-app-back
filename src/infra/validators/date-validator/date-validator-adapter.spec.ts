import { DateValidatorAdapter } from './date-validator-adapter'
import faker from 'faker'

const makeSut = (): DateValidatorAdapter => {
  return new DateValidatorAdapter()
}

describe('DateValidatorAdapter adapter', () => {
  test('Should return false if format invalid', () => {
    const sut = makeSut()
    const result = sut.isValid('2020/02/01T00:00:00')
    expect(result).toBeFalsy()
  })

  test('Should return false if date is invalid', () => {
    const sut = makeSut()
    const result = sut.isValid('2020-13-01T00:00:00')
    expect(result).toBeFalsy()
    const result2 = sut.isValid('2020-02-32T00:00:00')
    expect(result2).toBeFalsy()
  })

  test('Should return false if day is invalid', () => {
    const sut = makeSut()
    const result = sut.isValid('2019-02-29T00:00:00')
    expect(result).toBeFalsy()
  })

  test('Should return true if day is valid', () => {
    const sut = makeSut()
    const result = sut.isValid('2020-02-29T00:00:00')
    expect(result).toBeTruthy()
  })
  test('Should return true if date is valid', () => {
    const sut = makeSut()
    const result = sut.isValid(faker.date.recent().toISOString())
    expect(result).toBeTruthy()
  })
})
