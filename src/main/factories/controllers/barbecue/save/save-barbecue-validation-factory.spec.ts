import { makeSaveBarbecueValidation } from './save-barbecue-validation-factory'
import { Validation } from '@/presentation/protocols/validation'
import { RequiredFieldValidation } from '@/validation/validators/required-field/required-field-validation'
import { ValidationComposite } from '@/validation/validators/validation-composite'

jest.mock('@/validation/validators/validation-composite.ts')

describe('SaveBarbecueValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeSaveBarbecueValidation()

    const validations: Validation[] = []

    for (const field of ['date', 'description']) {
      validations.push(new RequiredFieldValidation(field))
    }

    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
