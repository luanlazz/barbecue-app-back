export const saveParticipantParamsSchema = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    name: { type: 'string' },
    pay: { type: 'number' },
    value: { type: 'number' }
  }
}
