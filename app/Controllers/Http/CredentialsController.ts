import { RouteHandler } from '@ioc:Adonis/Core/Route'

export default class CredentialsController {
  public index: RouteHandler = ({ auth }) => {
    return auth.user?.related('credentials').query()
  }

  public store: RouteHandler = ({ request, auth }) => {
    const user = auth.user!

    const payload = request.only(['name', 'password', 'description'])
    const username = request.input('username', '*')

    const credential = user.related('credentials').create({
      ...payload,
      username,
    })

    return credential
  }
}
