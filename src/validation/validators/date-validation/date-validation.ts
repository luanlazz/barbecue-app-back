import { Validation } from '@/presentation/protocols'
import { DateValidator } from '@/validation/protocols'
import { InvalidParamError } from '@/presentation/errors'

export class DateValidation implements Validation {
  constructor (
    private readonly dateValidator: DateValidator,
    private readonly field: string
  ) {}

  validate (input: any): Error {
    const isValid = this.dateValidator.isValid(input[this.field])
    if (!isValid) return new InvalidParamError(this.field)
  }
}
