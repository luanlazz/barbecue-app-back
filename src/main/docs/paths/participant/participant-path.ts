export const participantPath = {
  put: {
    security: [{
      apiKeyAuth: []
    }],
    tags: ['Participants'],
    summary: 'API to add or save participants',
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
  }
}
