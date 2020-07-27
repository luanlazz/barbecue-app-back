export const saveParticipantParamsSchema = {
  type: 'object',
  properties: {
    name: { type: 'string' },
    food: { type: 'boolean' },
    drink: { type: 'boolean' },
    pay: { type: 'number' }
  }
}
