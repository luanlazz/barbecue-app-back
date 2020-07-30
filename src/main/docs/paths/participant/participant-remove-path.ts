export const participantRemovePath = {
  delete: {
    security: [{
      apiKeyAuth: []
    }],
    tags: ['Participants'],
    summary: 'API to remove a participant by id',
    parameters: [{
      in: 'path',
      name: 'barbecueId',
      required: true,
      schema: {
        type: 'string'
      }
    }, {
      in: 'path',
      name: 'participantId',
      required: true,
      schema: {
        type: 'string'
      }
    }],
    responses: {
      204: {
        $ref: '#/components/noContent'
      },
      403: {
        $ref: '#/components/forbidden'
      },
      404: {
        $ref: '#/components/notFound'
      },
      500: {
        $ref: '#/components/serverError'
      }
    }
  }
}
