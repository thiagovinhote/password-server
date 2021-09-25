import { RouteHandler } from '@ioc:Adonis/Core/Route'
import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class FoldersController {
  public index: RouteHandler = ({ auth }) => {
    const { user } = auth
    const relatedFolder = user?.related('folders')

    return relatedFolder?.query()
  }

  public store: RouteHandler = async ({ auth, request }) => {
    const { user } = auth
    const newFolderSchema = schema.create({
      name: schema.string({ trim: true }, [rules.unique({ table: 'folders', column: 'name' })]),
    })
    const payload = await request.validate({ schema: newFolderSchema })
    const relatedFolder = user?.related('folders')

    const folder = await relatedFolder?.create(payload)

    return folder
  }
}
