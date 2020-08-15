import { DateValidator } from '@/validation/protocols'

export class DateValidatorAdapter implements DateValidator {
  isValid (date: string): boolean {
    return false
  }
}
