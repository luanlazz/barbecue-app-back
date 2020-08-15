import { QueryBuilder } from './query-builder'

describe('Query Builder', () => {
  test('Should return valid match query', () => {
    const query = new QueryBuilder()
      .match({ test: 'any_group' })
      .build()

    expect(query).toEqual([{
      $match: {
        test: 'any_group'
      }
    }])
  })

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

  test('Should return valid sort query', () => {
    const query = new QueryBuilder()
      .sort({ test: 'any_group' })
      .build()

    expect(query).toEqual([{
      $sort: {
        test: 'any_group'
      }
    }])
  })
})
