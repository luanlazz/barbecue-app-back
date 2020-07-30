export const saveBarbecueParamsSchema = {
  type: 'object',
  properties: {
    date: {
      type: 'string',
      format: 'date'
    },
    description: { type: 'string' },
    observation: { type: 'string' },
    valueSuggestDrink: { type: 'number' },
    valueSuggestFood: { type: 'number' }
  }
}
