import { RouteHandler } from '@ioc:Adonis/Core/Route'
import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class TagsController {
  public index: RouteHandler = ({ auth }) => {
    const { user } = auth
    const relatedTag = user?.related('tags')

    return relatedTag?.query()
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
