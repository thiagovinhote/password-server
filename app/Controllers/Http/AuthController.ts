import { RouteHandler } from '@ioc:Adonis/Core/Route'
import Env from '@ioc:Adonis/Core/Env'
import PrepareUserService from 'App/Services/PrepareUserService'

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

  public me: RouteHandler = async ({ auth }) => {
    return PrepareUserService.perform({ user: auth.user! })
  }
}
