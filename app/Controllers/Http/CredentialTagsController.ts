import { RouteHandler } from '@ioc:Adonis/Core/Route'
import Credential from 'App/Models/Credential'

export default class CredentialTagsController {
  public store: RouteHandler = async ({ request }) => {
    const credentialId = request.param('credential_id')
    const tagId = request.input('tag_id')
    const tagPivot = Credential.$getRelation('tagPivot').relatedModel()

    return tagPivot.create({
      tag_id: tagId,
      credential_id: credentialId,
    })
  }
}
