export const serviceUnavailableError = {
  description: 'Service Unavailable',
  content: {
    'application/json': {
      schema: {
        $ref: '#/schemas/error'
      }
    }
  }
}
