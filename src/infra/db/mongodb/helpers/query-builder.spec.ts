import { QueryBuilder } from './query-builder'

describe('Query Builder', () => {
  test('Should return valid group query', () => {
    const query = new QueryBuilder()
      .group({ test: 'any_group' })
      .build()

    expect(query).toEqual([{
      $group: {
        test: 'any_group'
      }
    }])
  })
})
