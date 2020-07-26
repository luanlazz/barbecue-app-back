export const barbecuePath = {
  put: {
    security: [{
      apiKeyAuth: []
    }],
    tags: ['Barbecue'],
    summary: 'API to create or save barbecues',
    parameters: [{
      in: 'path',
      name: 'barbecueId',
      required: false,
      schema: {
        type: 'string'
      }
    }],
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/saveBarbecueParams'
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
              $ref: '#/schemas/barbecue'
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
  get: {
    security: [{
      apiKeyAuth: []
    }],
    tags: ['Barbecue'],
    summary: 'API to list all barbecues by user',
    responses: {
      200: {
        description: 'Success',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/barbecues'
            }
          }
        }
      },
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
