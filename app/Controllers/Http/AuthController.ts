import { RouteHandler } from '@ioc:Adonis/Core/Route'

export default class AuthController {
  public login: RouteHandler = ({ auth, request }) => {
    const email = request.input('email')
    const password = request.input('password')

    return auth.use('api').attempt(email, password, { expiresIn: '1min' })
  }

  public me: RouteHandler = ({ auth }) => {
    return auth.user
  }
}
