import User from 'App/Models/User'

type Filters = {
  search?: string
  tags?: string[]
}

type Pagination = {
  page?: number
  limit?: number
}

type Params = {
  user: User
  filters: Filters
  pagination: Pagination
}

export default class SearchCredentialsService {
  public static perform({ user, pagination, filters }: Params) {
    const relatedCredential = user.related('credentials')

    return relatedCredential
      .query()
      .withScopes((scopes) => {
        scopes.search({ value: filters.search })
        scopes.filterByTags({ value: filters.tags ?? [] })
      })
      .preload('tags')
      .preload('folders')
      .orderBy('credentials.created_at', 'desc')
      .select('credentials.*')
      .paginate(pagination.page ?? 1, pagination.limit)
  }
}
