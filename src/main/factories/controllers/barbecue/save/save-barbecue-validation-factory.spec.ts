import { makeSaveBarbecueValidation } from './save-barbecue-validation-factory'
import { Validation } from '@/presentation/protocols'
import { RequiredFieldValidation, ValidationComposite, DateValidation } from '@/validation/validators'
import { DateValidatorAdapter } from '@/infra/validators'

jest.mock('@/validation/validators/validation-composite.ts')

describe('SaveBarbecueValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeSaveBarbecueValidation()

    const validations: Validation[] = []

    for (const field of ['date', 'description']) {
      validations.push(new RequiredFieldValidation(field))
    }

    validations.push(new DateValidation(new DateValidatorAdapter(), 'date'))

    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
