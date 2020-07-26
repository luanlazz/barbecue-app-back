import { ValidationComposite } from '@/validation/validators/validation-composite'
import { RequiredFieldValidation } from '@/validation/validators/required-field/required-field-validation'
import { Validation } from '@/presentation/protocols/validation'

export const makeSaveBarbecueValidation = (): ValidationComposite => {
  const validations: Validation[] = []

  for (const field of ['date', 'description']) {
    validations.push(new RequiredFieldValidation(field))
  }

  return new ValidationComposite(validations)
}
