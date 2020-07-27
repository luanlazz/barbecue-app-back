export const participantsSchema = {
  type: 'array',
  items: {
    $ref: '#/schemas/participant'
  }
}
