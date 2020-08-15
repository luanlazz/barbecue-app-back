import { Validation } from '@/presentation/protocols'
import { InvalidParamError } from '@/presentation/errors'
import { EmailValidator } from '@/validation/protocols'

export class EmailValidation implements Validation {
  constructor (
    private readonly emailValidator: EmailValidator,
    private readonly field: string
  ) {}

  validate (input: any): Error {
    const isValid = this.emailValidator.isValid(input[this.field])
    if (!isValid) return new InvalidParamError('email')
  }
}
