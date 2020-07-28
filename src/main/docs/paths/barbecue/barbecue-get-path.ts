export const barbecueGetPath = {
  get: {
    security: [{
      apiKeyAuth: []
    }],
    tags: ['Barbecue'],
    summary: 'API to list all barbecues by user',
    parameters: [{
      in: 'path',
      name: 'barbecueId',
      required: false,
      schema: {
        type: 'string'
      }
    }],
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
