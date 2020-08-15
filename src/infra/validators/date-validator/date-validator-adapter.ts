import { DateValidator } from '@/validation/protocols'

export class DateValidatorAdapter implements DateValidator {
  isValid (dateParam: string): boolean {
    const dateRegex = /(\d{4})-([0]?[1-9]|[1][0-2])-([12][0-9]|3[01]|0?[1-9])T.*/

    if (!dateRegex.test(dateParam)) {
      return false
    }

    const split = dateParam.split('-')
    const year = parseInt(split[0])
    const month = parseInt(split[1])
    const day = parseInt(split[2].split('T')[0])

    const monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

    if (year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0)) {
      monthLength[1] = 29
    }

    return day > 0 && day <= monthLength[month - 1]
  }
}
