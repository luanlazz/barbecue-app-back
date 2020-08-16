export const barbecueSchema = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    accountId: { type: 'string' },
    date: {
      type: 'string',
      format: 'date-time'
    },
    description: { type: 'string' },
    observation: { type: 'string' },
    valueSuggestDrink: { type: 'number' },
    valueSuggestFood: { type: 'number' },
    valueTotal: { type: 'number' },
    numParticipants: { type: 'number' },
    valueCollected: { type: 'number' }
  }
}
