import { RouteHandler } from '@ioc:Adonis/Core/Route'
import Env from '@ioc:Adonis/Core/Env'

export default class AuthController {
  public login: RouteHandler = async ({ auth, request, response }) => {
    const email = request.input('email')
    const password = request.input('password')

    try {
      const token = await auth
        .use('api')
        .attempt(email, password, { expiresIn: Env.get('JWT_EXPIRES_IN') })

      return {
        user: token.user,
        token: token.token,
      }
    } catch (error) {
      response.unauthorized({ error: { code: error.code, message: error.message } })
    }
  }

  public logout: RouteHandler = async ({ auth }) => {
    await auth.use('api').revoke()
  }

  public me: RouteHandler = ({ auth }) => {
    return auth.user
  }
}
