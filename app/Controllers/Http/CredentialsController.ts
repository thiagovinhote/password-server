import { RouteHandler } from '@ioc:Adonis/Core/Route'
import Credential from 'App/Models/Credential'

export default class CredentialsController {
  public index() {
    return Credential.all()
  }

  public store: RouteHandler = ({ request }) => {
    const payload = request.only<keyof Credential>(['name', 'password', 'description'])
    const username = request.input('username', '*')

    const credential = Credential.create({
      ...payload,
      username,
    })

    return credential
  }
}
