import { RouteHandler } from '@ioc:Adonis/Core/Route'
import Folder from 'App/Models/Folder'
import Credential from 'App/Models/Credential'

export default class CredentialsController {
  public index: RouteHandler = ({ auth }) => {
    return auth.user?.related('credentials').query().preload('tags')
  }

  public show: RouteHandler = async ({ request }) => {
    const credential = await Credential.findOrFail(request.param('id'))

    await credential.load('folders')

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
}
