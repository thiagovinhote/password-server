import User from 'App/Models/User'

type Filters = {
  search?: string
}

type Pagination = {
  page?: number
  limit?: number
}

type Params = {
  user: User
  pagination: Pagination
  filters: Filters
}

export class SearchTagsService {
  public static perform({ user, pagination, filters }: Params) {
    const relatedTag = user.related('tags')

    return relatedTag
      .query()
      .withScopes((scopes) => scopes.search({ value: filters.search }))
      .orderBy('created_at', 'desc')
      .paginate(pagination.page ?? 1, pagination.limit)
  }
}
