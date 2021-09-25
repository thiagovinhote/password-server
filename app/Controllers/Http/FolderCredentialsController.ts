import { RouteHandler } from '@ioc:Adonis/Core/Route'
import Folder from 'App/Models/Folder'

export default class FolderCredentialsController {
  public index: RouteHandler = async ({ request }) => {
    const folder = await Folder.findOrFail(request.param('folder_id'))

    return folder.related('credentials').query()
  }

  public store: RouteHandler = async ({ request }) => {
    const credentialId = request.input('credential_id')
    const folderId = request.param('folder_id')
    const credentialPivot = Folder.$getRelation('credentialPivot').relatedModel()

    return credentialPivot.create({
      folder_id: folderId,
      credential_id: credentialId,
    })
  }
}
