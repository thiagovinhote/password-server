import Credential from 'App/Models/Credential'
import Folder from 'App/Models/Folder'
import User from 'App/Models/User'

type Payload = {
  name: string
  password: string
  description?: string | null
  username?: string | null
  folderId?: string
}

type Params = {
  user: User
  payload: Payload
}

export default class SaveCredentialService {
  public static async perform({ user, payload }: Params) {
    const relatedCredential = user.related('credentials')

    const credential = new Credential()
    credential.name = payload.name
    credential.password = payload.password
    credential.description = payload.description ?? null
    credential.username = payload.username ?? '*'

    await relatedCredential.save(credential)

    if (payload.folderId && credential.$isPersisted) {
      const credentialPivot = Folder.$getRelation('credentialPivot').relatedModel()
      await credentialPivot.create({
        folder_id: payload.folderId,
        credential_id: credential.id,
      })

      await credential.refresh()
    }

    return credential
  }
}
