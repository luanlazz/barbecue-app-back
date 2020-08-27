import { NumberValidator } from '@/validation/protocols'
import validator from 'validator'

export class NumberValidatorAdapter implements NumberValidator {
  isValid (value: string): boolean {
    validator.isNumeric(value)
    return null
  }
}
