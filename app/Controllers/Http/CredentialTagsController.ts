import { RouteHandler } from '@ioc:Adonis/Core/Route'
import CredentialTag from 'App/Models/CredentialTag'

export default class CredentialTagsController {
  public store: RouteHandler = async ({ request }) => {
    const credentialId = request.param('credential_id')
    const tagId = request.input('tag_id')

    return CredentialTag.create({ credential_id: credentialId, tag_id: tagId })
  }

  public destroy: RouteHandler = async ({ request }) => {
    const credentialId = request.param('credential_id')
    const tagId = request.param('id')

    await CredentialTag.query().where({ credential_id: credentialId, tag_id: tagId }).delete()
  }
}
