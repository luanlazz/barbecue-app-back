import { Validation } from '@/presentation/protocols/validation'
import { DateValidator } from '@/validation/protocols/date-validation'

export class DateValidation implements Validation {
  constructor (
    private readonly dateValidator: DateValidator,
    private readonly field: string
  ) {}

  validate (input: any): Error {
    this.dateValidator.isValid(input[this.field])
    return null
  }
}
