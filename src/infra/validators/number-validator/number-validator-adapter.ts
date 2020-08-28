import { NumberValidator } from '@/validation/protocols'
import validator from 'validator'

export class NumberValidatorAdapter implements NumberValidator {
  isValid (value: any): boolean {
    const isValid = validator.isNumeric(value.toString(), { no_symbols: true })
    return isValid
  }
}
