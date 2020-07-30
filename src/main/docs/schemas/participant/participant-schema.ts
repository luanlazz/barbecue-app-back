export const participantSchema = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    barbecueId: { type: 'string' },
    name: { type: 'string' },
    pay: { type: 'boolean' },
    value: { type: 'number' }
  }
}
