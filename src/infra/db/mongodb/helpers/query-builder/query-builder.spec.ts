import { QueryBuilder } from './query-builder'

describe('Query Builder', () => {
  test('Should return valid match query', () => {
    const query = new QueryBuilder()
      .match({ test: 'any_match' })
      .group({ test: 'any_group' })
      .sort({ test: 'any_sort' })
      .unwind({ test: 'any_unwind' })
      .lookup({ test: 'any_lookup' })
      .project({ test: 'any_project' })
      .build()

    expect(query).toEqual([{ $match: { test: 'any_match' } },
      { $group: { test: 'any_group' } },
      { $sort: { test: 'any_sort' } },
      { $unwind: { test: 'any_unwind' } },
      { $lookup: { test: 'any_lookup' } },
      { $project: { test: 'any_project' } }
    ])
  })
})
