export const barbecueSchema = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    accountId: { type: 'string' },
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
