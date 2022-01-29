import { RouteHandler } from '@ioc:Adonis/Core/Route'
import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class TagsController {
  public index: RouteHandler = ({ auth, request }) => {
    const user = auth.user!
    const page = request.input('page', 1)
    const limit = request.input('limit', 10)
    const search = request.input('search')
    const relatedTag = user.related('tags')

    return relatedTag
      .query()
      .withScopes(scopes => scopes.search({ value: search }))
      .orderBy('created_at', 'desc')
      .paginate(page, limit)
  }

  public store: RouteHandler = async ({ auth, request }) => {
    const { user } = auth
    const newTagSchema = schema.create({
      label: schema.string({ trim: true }, [
        rules.unique({ table: 'tags', column: 'label', where: { user_id: user?.id } }),
      ]),
      color: schema.string(undefined, [rules.regex(/^#[0-9a-f]{6}/i)]),
    })
    const payload = await request.validate({ schema: newTagSchema })
    const relatedTag = user?.related('tags')

    const tag = await relatedTag?.create(payload)

    return tag
  }
}
