export const saveBarbecueParamsSchema = {
  type: 'object',
  properties: {
    date: {
      type: 'string',
      format: 'date-time'
    },
    description: { type: 'string' },
    observation: { type: 'string' },
    valueSuggestDrink: { type: 'number' },
    valueSuggestFood: { type: 'number' }
  }
}
