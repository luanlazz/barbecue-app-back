export const participantWithIdPath = {
  put: {
    security: [{
      apiKeyAuth: []
    }],
    tags: ['Participants'],
    summary: 'API save participant',
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
      required: false,
      schema: {
        type: 'string'
      }
    }],
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/saveParticipantParams'
          }
        }
      }
    },
    responses: {
      200: {
        description: 'Success',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/participants'
            }
          }
        }
      },
      400: {
        $ref: '#/components/badRequest'
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
  },
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
      },
      503: {
        $ref: '#/components/serviceUnavailable'
      }
    }
  }
}
