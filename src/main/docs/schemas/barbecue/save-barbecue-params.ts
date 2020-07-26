export const saveBarbecueParamsSchema = {
  type: 'object',
  properties: {
    date: {
      type: 'string',
      format: 'date'
    },
    description: { type: 'string' },
    observation: { type: 'string' },
    valueTotalDrink: { type: 'number' },
    valueTotalFood: { type: 'number' }
  }
}
