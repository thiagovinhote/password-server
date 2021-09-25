import { RouteHandler } from '@ioc:Adonis/Core/Route'

export default class CredentialsController {
  public index: RouteHandler = ({ auth }) => {
    return auth.user?.related('credentials').query().preload('tags')
  }

  public store: RouteHandler = ({ request, auth }) => {
    const user = auth.user!
    const payload = request.only(['name', 'password', 'description'])
    const username = request.input('username', '*')
    const relatedCredential = user.related('credentials')

    const credential = relatedCredential.create({
      ...payload,
      username,
    })

    return credential
  }
}
