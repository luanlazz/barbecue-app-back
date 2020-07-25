import { ValidationComposite } from '@/validation/validators/validation-composite'
import { RequiredFieldValidation } from '@/validation/validators/required-field/required-field-validation'
import { EmailValidation } from '@/validation/validators/email-validation/email-validation'
import { CompareFieldsValidation } from '@/validation/validators/compare-fields/compare-fields-validation'
import { Validation } from '@/presentation/protocols/validation'
import { EmailValidatorAdapter } from '@/infra/validators/email-validator-adapter'

export const makeSignUpValidation = (): ValidationComposite => {
  const validations: Validation[] = []

  for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
    validations.push(new RequiredFieldValidation(field))
  }

  validations.push(new EmailValidation(new EmailValidatorAdapter(), 'email'))

  validations.push(new CompareFieldsValidation('password', 'passwordConfirmation'))

  return new ValidationComposite(validations)
}
