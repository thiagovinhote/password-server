import { RouteHandler } from '@ioc:Adonis/Core/Route'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { SearchTagsService } from 'App/Services/SearchTagsService'

export default class TagsController {
  public index: RouteHandler = async ({ auth, request }) => {
    const user = auth.user!
    const payload = await request.validate({
      schema: schema.create({
        page: schema.number.optional(),
        limit: schema.number.optional(),
        search: schema.string.optional({ trim: true }),
      }),
    })
    return SearchTagsService.perform({
      user,
      pagination: { page: payload.page, limit: payload.limit },
      filters: { search: payload.search },
    })
  }

  public store: RouteHandler = async ({ auth, request }) => {
    const user = auth.user!
    const payload = await request.validate({
      schema: schema.create({
        label: schema.string({ trim: true }, [
          rules.unique({ table: 'tags', column: 'label', where: { user_id: user.id } }),
        ]),
        color: schema.string({}, [rules.regex(/^#[0-9a-f]{6}/i)]),
      }),
    })
    const relatedTag = user.related('tags')
    const tag = await relatedTag.create(payload)
    return tag
  }
}
