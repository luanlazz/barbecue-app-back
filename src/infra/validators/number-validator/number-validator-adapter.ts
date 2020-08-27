import { NumberValidator } from '@/validation/protocols'
import validator from 'validator'

export class NumberValidatorAdapter implements NumberValidator {
  isValid (value: string): boolean {
    const isValid = validator.isNumeric(value)
    return isValid
  }
}
