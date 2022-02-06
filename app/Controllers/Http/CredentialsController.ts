import { RouteHandler } from '@ioc:Adonis/Core/Route'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import Credential from 'App/Models/Credential'
import SearchCredentialsService from 'App/Services/SearchCredentialsService'
import SaveCredentialService from 'App/Services/SaveCredentialService'

export default class CredentialsController {
  public index: RouteHandler = async ({ request, auth }) => {
    const user = auth.user!
    const payload = await request.validate({
      schema: schema.create({
        page: schema.number.optional(),
        limit: schema.number.optional(),
        search: schema.string.optional({ trim: true }),
        tags: schema.array.optional().members(schema.string({ trim: true }, [rules.uuid()])),
      }),
    })
    return SearchCredentialsService.perform({
      user,
      pagination: { page: payload.page, limit: payload.limit },
      filters: { search: payload.search, tags: payload.tags },
    })
  }

  public show: RouteHandler = async ({ request }) => {
    const credential = await Credential.findOrFail(request.param('id'))
    await credential.load((loader) => loader.load('folders').load('tags'))
    return credential
  }

  public store: RouteHandler = async ({ request, auth }) => {
    const user = auth.user!
    const payload = await request.validate({
      schema: schema.create({
        name: schema.string({ trim: true }),
        password: schema.string(),
        description: schema.string.nullableAndOptional({ trim: true }),
        username: schema.string.nullableAndOptional({ trim: true }),
        folder_id: schema.string.optional({}, [rules.uuid()]),
      }),
    })
    return SaveCredentialService.perform({
      user,
      payload: {
        name: payload.name,
        description: payload.description,
        password: payload.password,
        username: payload.username,
        folderId: payload.folder_id,
      },
    })
  }

  public update: RouteHandler = async ({ request }) => {
    const payload = await request.validate({
      schema: schema.create({
        name: schema.string.optional({ trim: true }),
        username: schema.string.optional({ trim: true }),
        description: schema.string.nullableAndOptional({ trim: true }),
      }),
    })
    const credential = await Credential.findOrFail(request.param('id'))
    await credential.merge(payload).save()
    return credential
  }

  public destroy: RouteHandler = async ({ request }) => {
    const credential = await Credential.findOrFail(request.param('id'))
    await credential.delete()
  }
}
