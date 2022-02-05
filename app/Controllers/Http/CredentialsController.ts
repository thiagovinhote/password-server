import { RouteHandler } from '@ioc:Adonis/Core/Route'
import Folder from 'App/Models/Folder'
import Credential from 'App/Models/Credential'
import SearchCredentialsService from 'App/Services/SearchCredentialsService'

export default class CredentialsController {
  public index: RouteHandler = ({ request, auth }) => {
    const user = auth.user!
    const page = Number(request.input('page', 1))
    const limit = Number(request.input('limit', 10))
    const search = String(request.input('search'))
    const tagQueryString = request.input('tags', [])
    const tags: string[] = Array.isArray(tagQueryString) ? tagQueryString : [tagQueryString]

    return SearchCredentialsService.handle({
      user,
      pagination: { page, limit },
      filters: { search, tags },
    })
  }

  public show: RouteHandler = async ({ request }) => {
    const credential = await Credential.findOrFail(request.param('id'))

    await credential.load((loader) => loader.load('folders').load('tags'))

    return credential
  }

  public store: RouteHandler = async ({ request, auth }) => {
    const user = auth.user!
    const payload = request.only(['name', 'password', 'description'])
    const folderId = request.input('folder_id', null)
    const username = request.input('username', '*')
    const relatedCredential = user.related('credentials')

    const credential = await relatedCredential.create({
      ...payload,
      username,
    })

    if (folderId && credential.$isPersisted) {
      const credentialPivot = Folder.$getRelation('credentialPivot').relatedModel()
      await credentialPivot.create({
        folder_id: folderId,
        credential_id: credential.id,
      })
      await credential.refresh()
    }

    return credential
  }

  public update: RouteHandler = async ({ request }) => {
    const credential = await Credential.findOrFail(request.param('id'))
    const payload = request.only(['name', 'username', 'description'])

    await credential.merge(payload).save()

    return credential
  }

  public destroy: RouteHandler = async ({ request }) => {
    const credential = await Credential.findOrFail(request.param('id'))

    await credential.delete()
  }
}
